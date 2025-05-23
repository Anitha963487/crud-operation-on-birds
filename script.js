// Birds array to store bird objects
let birds = [
  {name:"Peacock",colour:"Green",habitat:"Sri Lanka"},
  {name:"Flamingo",colour:"Pink",habitat:"Lagoons"},
  {name:"Parrot",colour:"Green",habitat:"Tropical"},
  {name:"kingfisher",colour:"Orange",habitat:"Lakes"},
  {name:"Robin",colour:"Brown",habitat:"Parks"}
];
let editingBirdId = null;

// DOM elements
const birdForm = document.getElementById('birdForm');
const nameInput = document.getElementById('name');
const colourInput = document.getElementById('colour');
const habitatInput = document.getElementById('habitat');
const birdIdInput = document.getElementById('birdId');
const birdsTableBody = document.getElementById('birdsTableBody');
const submitBtn = document.getElementById('submitBtn');

// CRUD functions
function renderBirds() {
    birdsTableBody.innerHTML = '';
    birds.forEach((bird, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bird.name}</td>
            <td>${bird.colour}</td>
            <td>${bird.habitat}</td>
            <td class="actions">
                <button class="edit" onclick="editBird(${index})">Edit</button>
                <button class="delete" onclick="deleteBird(${index})">Delete</button>
            </td>
        `;
        birdsTableBody.appendChild(row);
    });
}

function addBird(bird) {
    birds.push(bird);
    renderBirds();
}

function updateBird(index, bird) {
    birds[index] = bird;
    renderBirds();
}

function deleteBird(index) {
    if (confirm('Are you sure you want to delete this bird?')) {
        birds.splice(index, 1);
        renderBirds();
    }
}

function editBird(index) {
    const bird = birds[index];
    nameInput.value = bird.name;
    colourInput.value = bird.colour;
    habitatInput.value = bird.habitat;
    birdIdInput.value = index;
    submitBtn.textContent = 'Update Bird';
    editingBirdId = index;
}

// Handle form submission
birdForm.onsubmit = function(e) {
    e.preventDefault();
    const bird = {
        name: nameInput.value.trim(),
        colour: colourInput.value.trim(),
        habitat: parseInt(habitatInput.value)
    };

    if (editingBirdId !== null) {
        updateBird(editingBirdId, bird);
        submitBtn.textContent = 'Add Bird';
        editingBirdId = null;
    } else {
        addBird(bird);
    }

    birdForm.reset();
    birdIdInput.value = '';
};

// Initial render
renderBirds();

// Expose functions for inline onclick
window.editBird = editBird;
window.deleteBird = deleteBird;