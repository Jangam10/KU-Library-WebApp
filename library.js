showBooks();

let addBook= document.getElementById("addBook");

addBook.addEventListener("click",function (e) {
    e.preventDefault();
    let name=document.getElementById("name");
    let author=document.getElementById("author");
    let type=document.getElementById("type");
    // console.log("Add book is fired");
    let books=localStorage.getItem("books");
    if (books==null)
    {
        booksObj=[];
    }
    else{
        booksObj=JSON.parse(books);
    }
    let myBook={
        name:name.value,
        author:author.value,
        type:type.value,
    }
    booksObj.push(myBook);
    console.log(booksObj);
    localStorage.setItem("books",JSON.stringify(booksObj));
    name.value="";
    author.value="";
    type.value="";
    showBooks();
})

function showBooks() {
    let books=localStorage.getItem("books");
    if (books==null)
    {
        booksObj=[];
    }
    else{
        booksObj=JSON.parse(books);
    }
    let html="";
    booksObj.forEach(function (element,index) {
    html+=`<tr class="bookName">
    <th scope="row">${index+1}</th>
    <td >${element.name}</td>
    <td>${element.author}</td>
    <td>${element.type}</td>
    <td><button onclick="returnBook(this.id)"  class="btn btn-primary" id=${index}>Return Book</button></td>
  </tr>`        
    });
    let tablecontent=document.querySelector("#content");
    if (booksObj.length!=0)
    {
        tablecontent.innerHTML = html;
    }
    else{
        tablecontent.innerHTML =`You have not borrowed any books`
    }
}

//function to remove books
function returnBook(index){
    // console.log("returning the book", index);
    let books=localStorage.getItem("books");
    if (books==null)
    {
        booksObj=[];
    }
    else{
        booksObj=JSON.parse(books);
    }

    booksObj.splice(index,1);
    localStorage.setItem("books",JSON.stringify(booksObj));
    showBooks();
}

let searchTxt = document.getElementById("searchTxt");
let searchBtn = document.getElementById("search");

searchBtn.addEventListener("click",function (e) {
    e.preventDefault();
    let inputVal = searchTxt.value.toLowerCase();
    // console.log("Input event fired",inputVal);
    let bookDetails = document.querySelectorAll(".bookName");
    // console.log(bookDetails);
    Array.from(bookDetails).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("td")[0].innerText.toLowerCase();
        if ((cardTxt.includes(inputVal))==0)
        {
            element.style.display ="none";
        }    
});
});

searchBtn.addEventListener("blur",function (e) {
    e.preventDefault();
    searchTxt.value="";
    showBooks();
})