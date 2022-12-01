"use strict";

const name = document.querySelector("#name");
const id = document.querySelector("#id");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register(){
    if(!name || !id.value || !password.value || !confirmPassword){
        return alert("입력 항목을 확인해주세요.");
    }
    if(password.value !== confirmPassword.value){
        return alert("비밀번호가 일치하지 않습니다.");
    }

    const req = {
        name : name.value,
        id : id.value,
        password : password.value,
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if(res.success){
            location.href = "/login";
        }else{
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.log("ERROR");
    });
}