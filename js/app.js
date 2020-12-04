//Performance

const start = performance.now();

//Global Variables

//the three global variables needed for this project are:
// 1. currentSection: to keep track of the currentSection that the user is viewing on the pageSections
// 2. currentNavLink: the link to the section currently being viewed
// 3. pageSections: a list of the different sections on the page

let currentSection = document.querySelector(".active-section");
let currentNavLink = document.querySelector(".active-nav-link");
let pageSections = document.querySelectorAll("section");

// the create navBar function will create and populate the navBar, while also assigning appropriate functionality to it

function createNavBar() {
  //use a document method to find/store reference to the navBar list
  const navBar = document.querySelector("#navbar__list");

  //iterate through the globally stored collection of sections
  for (const section of pageSections) {
    //if the currentNavLink does not exist, then we will assign it to the first value while iterating
    if (!currentNavLink) {
      //we will insert an <li></li> element with a class, data-id, and id, with the text being the current section
      navBar.insertAdjacentHTML(
        "beforeend",
        `<li class="menu__link active-nav" data-id="${section.id}" id="nav-${section.id}">${section.dataset.nav}</li>`
      );
    } else {
      listFragment.insertAdjacentHTML(
        "beforeend",
        `<li class="menu__link" data-id="${section.id}" id="nav-${section.id}">${section.dataset.nav}</li>`
      );
    }
  }
  //now that the navBar has been created we will add two event listeners to the page
  //   1. A "click" listener to the navBar, which will navigate the user to the correct location on the page
  //   2. A "scroll" listener to the entire document, which will find the users location on the page as they scroll, and update the currentSection as needed
  navBar.addEventListener("click", function (event) {
    const section = document.querySelector(`#${event.target.dataset.id}`);
    section.scrollIntoView({ behavior: "smooth", block: "end" });
  });
  document.addEventListener("scroll", function () {
    for (const section of pageSections) {
      if (!currentSection) {
        currentSection = section;
      }
      console.log("pageSections", pageSections);
      //the method returns a number of values regarding the elements current position
      const position = section.getBoundingClientRect();
      //if this conditional is true, then that section is at the top of the page, and should be set as the currentSection
      if (position.top > 0) {
        currentSection.classList.toggle("active-section");
        section.classList.add("active-section");
        currentSection = section;
        const nav = document.querySelector(`#nav-${section.id}`);
        if (!currentNavLink) {
          currentNavLink = nav;
        }
        currentNavLink.classList.remove("active-nav");
        currentNavLink.style.backgroundColor = "white";
        nav.classList.add("active-nav");
        nav.style.backgroundColor = "grey";
        currentNavLink = nav;
        break;
      }
    }
  });
}

//run create navBar Function
createNavBar();

const end = performance.now();

//This measure will tell me how quickly this functionality runs, allowing me to measure the impact of my refactoring
console.log("Time to run" + (end - start));
