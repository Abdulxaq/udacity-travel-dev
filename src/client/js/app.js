
const form = document.getElementById('form');
const d = new Date();
const year = d.getFullYear();
const month = d.getMonth();
const day = d.getDate();


form.innerHTML = `        <div class="md-form pink-textarea active-amber-textarea-2" id="nameDiv">
<input type="url" id="name" value="" placeholder="Travel to" class="md-textarea form-control"
    rows="3">
</div>
<input type="date" id="dateInput" min="${year}-0${month + 1}-0${day}" max="${year}-0${month + 1}-${day + 15}" class="md-textarea form-control"
rows="3">
<input id="check" class="btn btn-secondary" type="submit" value="Let's travel"
onclick="return Client.handleSubmit(event)" onsubmit="return Client.handleSubmit(event)">`

const showNavLinks = ()=>{
    const moveNavLinks = document.getElementById('moveNavLinks'); 
    moveNavLinks.classList.toggle('moveNavLinks')
}
export {showNavLinks}