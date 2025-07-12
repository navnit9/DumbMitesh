// Global variables
let memeCount = 0;

// DOM Elements
const memeUpload = document.getElementById('memeUpload');
const memeGallery = document.getElementById('memeGallery');
const memeCounter = document.getElementById('memeCount');

// ======================
// 1. UPLOAD NEW MEME
// ======================
memeUpload.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    // A) Upload to Firebase Storage
    const storageRef = storage.ref(`mitesh-memes/${Date.now()}_${file.name}`);
    await storageRef.put(file);
    const imageUrl = await storageRef.getDownloadURL();

    // B) Generate funny caption
    const captions = [
      "When Mitesh tries to think...",
      "Mitesh's brain cells: 404 Not Found",
      "This is why we can't have nice things",
      "Proof that evolution can go backwards"
    ];
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];

    // C) Save to Firestore
    await db.collection('memes').add({
      imageUrl,
      caption: randomCaption,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // D) Display immediately
    addMemeToGallery(imageUrl, randomCaption);
    updateCounter(1); // Increase counter by 1

  } catch (error) {
    console.error("Upload failed:", error);
    alert("Mitesh broke the upload! Try again.");
  }
});

// ======================
// 2. LOAD EXISTING MEMES
// ======================
async function loadMemes() {
  try {
    const snapshot = await db.collection('memes')
      .orderBy('createdAt', 'desc')
      .get();

    memeCount = snapshot.size;
    updateCounter(0); // Set counter without incrementing

    snapshot.forEach(doc => {
      const meme = doc.data();
      addMemeToGallery(meme.imageUrl, meme.caption);
    });

  } catch (error) {
    console.error("Failed to load memes:", error);
  }
}

// ======================
// HELPER FUNCTIONS
// ======================
function addMemeToGallery(imageUrl, caption) {
  const memeCard = document.createElement('div');
  memeCard.className = 'meme-card';
  memeCard.innerHTML = `
    <img src="${imageUrl}" alt="Mitesh being dumb">
    <div class="meme-caption">${caption}</div>
  `;
  memeGallery.appendChild(memeCard);
}

function updateCounter(increment = 0) {
  memeCount += increment;
  memeCounter.textContent = memeCount;
}

// Load memes when page loads
window.addEventListener('DOMContentLoaded', loadMemes);
