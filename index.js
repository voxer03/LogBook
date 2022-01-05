 console.log('welcome the page');
showpages(); // why we add this function here, because if the web-page reloaded then all the pages will appear automatically, if we don't call this function here, then all the pages will get vanish with the web-page reloading.

// If user add the pages in the notebook , then it add to the localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    // whenever user click on the add button then this will happen.
    let addTxt = document.getElementById('addTxt');
    let pages = localStorage.getItem('pages');
    if (pages == null) {
        pagesObj = [];
    }
    else {
        pagesObj = JSON.parse(pages);
    }
    pagesObj.push(addTxt.value);
    localStorage.setItem('pages', JSON.stringify(pagesObj)) // convert the notes into string(which is an array now)
    // converting in string from array because in the localstorage , it is mandatory to set the data in strings.

    addTxt.value = ''; // we set add.Txt as blank ecuse when we add the page then after adding the textarea get clear for new pages.
    console.log(pagesObj);

    showpages();
})

function showpages() {
    let pages = localStorage.getItem('pages');
    if (pages == null) {
        pagesObj = [];
    }
    else {
        pagesObj = JSON.parse(pages);
    }
    let html = '';
    pagesObj.forEach(function (element, index){
        
        html += `
                    <div class="pageCard card my2 mx-2" style="width: 1088px; margin: 12px;  border: 2px solid grey;">
                    <div class="card-body" style="margin: 20px 23px;
            padding: 15px 15px;border: 2px solid black; box-shadow: 9px 9px 10px;">
            <h5 class="card-title">Page ${index+1}</h5>
            <p class="card-text"> ${element}</p>
            <button id="${index}" onclick="deletePage(this.id)" class="btn btn-primary">Delete Page</button>
            </div>
            </div>    `;
    
    });

    let pagesElm = document.getElementById('pages');
    // here , the condition is if the user left the textarea blank, then it will throw an error that you should have to write somthing here for addition.
    // so it will check if the length of page is nothing then  the page will not be added. 
    if(pagesObj.length != 0)
    {
        pagesElm.innerHTML=html;
    }
    else
    {
        pagesElm.innerHTML = 'write something to add';
    }   
}

// Logic for Deleting the page.
function deletePage(index)
{
    let pages = localStorage.getItem('pages');
    if (pages == null) {
        pagesObj = [];
    }
    else {
        pagesObj = JSON.parse(pages);
    }
    pagesObj.splice(index,1);
    localStorage.setItem('pages', JSON.stringify(pagesObj))
    showpages();

}

let search = document.getElementById("search");
search.addEventListener("input",function(){
    let searchV = search.value;
    console.log("input event fired");
    let pagecards = document.getElementsByClassName("pageCard");
    Array.from(pagecards).forEach(function(element){
        let cardtext = element.getElementsByTagName('p')[0].innerText;
        console.log(cardtext);
        if(cardtext.includes(searchV))
        {
            element.style.display = 'block';
        }
        else
        {
            element.style.display = 'none';
        }
    })
}) 