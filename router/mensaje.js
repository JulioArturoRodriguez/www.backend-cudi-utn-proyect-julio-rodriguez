import express from "express";
import {
    receiveMessageController
} from "../controller/controllerMensaje.js";

const routerMensaje = express.Router();


routerMensaje.post("/mensaje", receiveMessageController); 


export default routerMensaje;
