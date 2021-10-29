let url = 'http://domain.ru/filter?size=M&color=1&color=2&manufacturer=aaa&manufacturer=ddd';

let paramsArr = url.split('?');
const domainPart = paramsArr[0];
const filterPart = paramsArr[1];
const urlPrefix = domainPart + '?';
paramsArr = filterPart.split('&');

let state = {
    size: '',
    color: '',
    manufacturer: '',
}

function getElements (element, params) {
    return  document.getElementById(element + '_' + params);
}

function initialState () {
    let elementsToState = state;
    for (let i = 0; i < paramsArr.length; i++) {
        let keyValueElement = paramsArr[i].split('=');
        let element = getElements(keyValueElement[0], keyValueElement[1]);
        element.localName === 'input'
            ? postStatus(element, 'checked', elementsToState)
            : postStatus(element, 'selected', elementsToState)
    }
    document.getElementById('sale').checked = true;
    generateUrl(elementsToState);
}

let postStatus = (element, status, obj) => {
    let parent = element.parentElement;
    element[status] = true;
    obj[parent.id] += element.id + '&';
}

let changeHandler = (event) => {
    let parent = event.target.parentElement;
    let children = parent.childNodes;
    let elementsToState = [];
    let stateKey = parent.id;

    for (let i = 0; i < children.length; i++) {
        if (children[i].checked || children[i].selected) {
            elementsToState.push(children[i].id + '&');
        }
    }
    state[stateKey] = elementsToState.join('');
    return generateUrl(state);
}

function generateUrl (obj) {
    let output = Object.values(obj);
    console.log( urlPrefix + '' + output.join(''));
}


let sizeContainer = document.getElementById('size');
sizeContainer.addEventListener('change', changeHandler);

let colorContainer = document.getElementById('color');
colorContainer.addEventListener('change', changeHandler);

let manufacturerContainer = document.getElementById('manufacturer');
manufacturerContainer.addEventListener('click', changeHandler);



initialState();