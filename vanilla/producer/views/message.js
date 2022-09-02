import './message.css';
import html from './message.html';

let elements = [];
let body;

const wrappingElement =
  window.document.getElementById('widget') ??
  window.document.body;
export function show(text) {
  wrappingElement.addEventListener('click', openModal);
  // openModal()

}

const openModal = () => {
  console.log('eye')
  let temporary = document.createElement('div');
  wrappingElement.innerHTML = html;
  temporary.getElementsByClassName('js-widget-dialog')[0].textContent = 'text';

  // append elements to body
  body = document.getElementsByTagName('body')[0];
  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    body.appendChild(temporary.children[0]);
  }

  body.addEventListener('click', close);
}


export function close() {
  while (elements.length > 0) {
    elements.pop().remove();
  }
  body.removeEventListener('click', close);
}