function loadData(){
    const url = 'https://randomuser.me/api/?results=5';
    const ul = document.getElementById("authors");
    const container = document.getElementById("authorsContainer");
    ul.innerHTML= "";

    function createNode(element) {
        return document.createElement(element);
    }
    
    function append(parent, el) {
        return parent.appendChild(el);
    }

    fetch(url).
        then(resp => resp.json()).
        then(data => {
            let li = createNode('li');
            let span = createNode('span');
            span.innerHTML = JSON.stringify(data, null, ' ');
            append(li, span);
            append(ul, li);

            var button = document.getElementById("makePretty");
            if (button) {
                container.removeChild(button);
            }

            button = createNode('button');
            button.id="makePretty";
            button.innerHTML = "Make pretty";
            append(container, button);

            button.addEventListener('click', () => {
                ul.innerHTML = "";
                let authorsData = data.results
                authorsData.map(function(author) {
                    let li = createNode('li');
                    let img = createNode('img');
                    let span = createNode('span');
                    img.src = author.picture.medium;
                    span.innerHTML = `${author.name.first} ${author.name.last}`;
                    var buttonExp = createNode('button');
                    buttonExp.id="expandThis";
                    buttonExp.innerHTML = 'details';
                    buttonExp.addEventListener('click', () => {
                       // window.open("2nd.html") 
                       var li2 = createNode('li');
                       span.innerHTML=` ${author.gender} ${author.nat} ${author.location.city}`;
                       
                    });
                    append(li, img);
                    append(li, span);
                    append(li,buttonExp);
                    append(ul, li);
                });
            });
        }).catch(function(error){
            console.log(">> "+ error);
        });
}

