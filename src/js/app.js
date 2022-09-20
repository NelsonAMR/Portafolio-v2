const idStart = document.getElementById('start');
const idSkills = document.getElementById('skills');
const idProjects = document.getElementById('projects');
const idContact = document.getElementById('contact');
const idMenu = document.getElementById('menu');

const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav-links');

emailjs.init('kPcbVCNMz3c7UtZY_');
const form = document.getElementById('form');
const formBtn = document.getElementById('form-btn');

idMenu.addEventListener('click', openNav);
navLinks.addEventListener('click', linkClick);
form.addEventListener('submit', formSubmit);

function openNav(){
    nav.style = 'position: unset;';
    navLinks.classList.remove('hide');
}

function linkClick(){    
    nav.style = 'position: fixed;';
    navLinks.classList.add('hide');
}

function formSubmit(e){
    e.preventDefault();

    const serviceID = 'default_service';
    const templateID = 'template_r7p0oyu';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            alert('Enviado!');

            form.reset();
        }, (err) => {
            alert(JSON.stringify(err));
        });
}