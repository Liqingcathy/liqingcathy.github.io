window.onload = () => {
  const defaultButton = document.querySelector(".filterbtn.active");
  if (defaultButton) {
    defaultButton.click();
  }
}

let paragraphAdded = false;
let textPara = null; 

const filterBySkills = (option) => {
  let filteredSkillList;
  filteredSkillList = Array.from(document.getElementsByClassName('filterby'));
  if (option == 'all') option = '';

  if (paragraphAdded && textPara) {
    textPara.parentNode.removeChild(textPara);
    paragraphAdded = false;
  }

  for (let i = 0; i < filteredSkillList.length; i++){
    removeClass(filteredSkillList[i], 'show');
    if (filteredSkillList[i].className.indexOf(option) > -1) {
      addClass(filteredSkillList[i], 'show', option);
    }
  }
}

const addClass = (domElement, elementClass, option) => {
  let elementClassName1, elementClassName2;
  elementClassName1 = domElement.className.split(' ');
  elementClassName2 = elementClass.split(' ');

  if(option === "Climatebase".toLowerCase()){
    if (!paragraphAdded) {
      textPara = document.createElement("div");
      textPara.id = 'climatebase-desc';
      const text = `
                    Contributed as a self-starting developer and researcher on projects 
                    MVP ideation, Website designing, and Web development,
                    working closely with industry 
                    UX researchers, product managers, engineers, and SEO experts.
                    `;
      const node = document.createTextNode(text);
      textPara.appendChild(node);
      domElement.parentNode.insertBefore(textPara, domElement.parentNode.firstChild);
      paragraphAdded = true;
    }
  }

  for(let i =0; i < elementClassName2.length; i++){
    if (elementClassName1.indexOf(elementClassName2[i]) == -1) {
      domElement.className += ' ' + elementClassName2[i];
    }
  }
}

const removeClass = (domElement, elementClass) => {
  let elementClassName1, elementClassName2;
  elementClassName1 = domElement.className.split(' ');
  elementClassName2 = elementClass.split(' ');
  for(let i =0; i < elementClassName2.length; i++){
    while (elementClassName1.indexOf(elementClassName2[i]) > -1) {
      elementClassName1.splice(elementClassName1.indexOf(elementClassName2[i], 1));
    }
  }
  domElement.className = elementClassName1.join(' ');
}

const sortByTime = () => {
  const projectLists = document.querySelectorAll(".project li");
  console.log(projectLists);

  const projectWithDates = Array.from(projectLists).map((element) => ({
    element: element,
    date: new Date(element.getAttribute("data-date"))
  }));
  console.log(projectWithDates);

  projectWithDates.sort((a,b) => {
    return b.date - a.date
  });
  console.log('sorted?', projectWithDates);
  //clear existing projects 
  const ulProject = document.querySelector(".project");
  ulProject.innerHTML = '';

  projectWithDates.forEach((item) => ulProject.appendChild(item.element));
}