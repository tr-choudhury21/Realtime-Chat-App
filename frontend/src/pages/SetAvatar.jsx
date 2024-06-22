import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components"
import Logo from '../assets/VC Logo.png'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { setAvatarRoute } from '../utils/APIRoutes'

const SetAvatar = () => {

    const api = "https://api.multiavatar.com/45678945";
    const navigate = useNavigate();

    return (
        <div>SetAvatar</div>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    background-color: #131324;
    height: 100vh;
    width: 100vw;

    .loader {
        max-inline-size: 100%;
    }

    .title-container {
        h1 {
        color: white;
        }
    }
    .avatars {
        display: flex;
        gap: 2rem;

        .avatar {
        border: 0.4rem solid transparent;
        padding: 0.4rem;
        border-radius: 5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s ease-in-out;
        img {
            height: 6rem;
            transition: 0.5s ease-in-out;
        }
        }
        .selected {
        border: 0.4rem solid #4e0eff;
        }
    }
    .submit-btn {
        background-color: #4e0eff;
        color: white;
        padding: 1rem 2rem;
        border: none;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        &:hover {
        background-color: #4e0eff;
        }
    }
    `;

export default SetAvatar