import React, { useEffect, useState, useContext } from "react";
import "./placeForm.css";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../../Shared/Components/FormElements/Input";
import Button from "../../Shared/Components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../Shared/util/validators";
import { useForm } from "../../Shared/Hooks/Form-Hook";
import Card from "../../Shared/Components/UIElements/Card";
import { useHttpClient } from "../../Shared/Hooks/Http-Hook";
import LoadingSpinner from "../../Shared/Components/UIElements/LoadingSpinner";
import ErrorModal from "../../Shared/Components/UIElements/ErrorModal";
import { AuthContext } from "../../Shared/Context/Auth-Context";

const updatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const navigate = useNavigate();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const resopnseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/places/${placeId}`
        );
        setLoadedPlace(resopnseData.place);
        setFormData(
          {
            title: {
              value: resopnseData.place.title,
              isValid: true,
            },
            description: {
              value: resopnseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {}
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      navigate("/" + auth.userId + "/places");
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isLoading && !loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Title."
            onInput={inputHandler}
            initialvalue={loadedPlace.title}
            initialvalid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid Description (at least 5 characters)."
            onInput={inputHandler}
            initialvalue={loadedPlace.description}
            initialvalid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default updatePlace;
