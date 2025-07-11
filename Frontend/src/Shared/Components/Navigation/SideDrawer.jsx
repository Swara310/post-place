import React ,{useRef} from "react";
import "./SideDrawer.css";
import ReactDom from "react-dom";
import {CSSTransition} from 'react-transition-group'

const SideDrawer = props => {

    const nodeRef = useRef(null);
    const content = (
    <CSSTransition 
    in={props.show}
    timeout={200}
    classNames={"slide-in-left"}
    mountOnEnter
    unmountOnExit
    nodeRef={nodeRef}
    > 
        <aside className="side-drawer" ref={nodeRef} onClick={props.onClick}>
            {props.children}
        </aside>
    </CSSTransition>
    );
    
    return ReactDom.createPortal(content,document.getElementById("drawer-hook"));
};

export default SideDrawer;
