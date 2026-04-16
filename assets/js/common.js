// Initialisation EmailJS
(function() {
  emailjs.init({ publicKey: "86JbYSV8RdTJuLh2p" });
})();

// SAV Modal (vanilla JS)
document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('sav-container');
  if (!container) return;

  // Création du badge et du modal
  const badge = document.createElement('div');
  badge.className = 'fixed bottom-24 right-6 z-40 bg-red-600 hover:bg-black text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-3 cursor-pointer transition';
  badge.innerHTML = '<div class="w-2.5 h-2.5 rounded-full bg-green-400 pulse-dot"></div><span class="text-sm font-bold tracking-wide">SAV 24h/24 7j/7</span>';
  document.body.appendChild(badge);

  // Structure du modal
  const modal = document.createElement('div');
  modal.id = 'savModal';
  modal.className = 'fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm hidden';
  modal.innerHTML = `
    <div class="bg-white w-full sm:max-w-lg sm:rounded-2xl shadow-2xl overflow-hidden" style="max-height:95vh">
      <div class="bg-black text-white px-5 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
          <div><p class="font-bold text-sm leading-tight">Service Après-Vente</p><div class="flex items-center gap-1.5 mt-0.5"><div class="w-2 h-2 bg-green-400 rounded-full pulse-dot"></div><span class="text-xs text-gray-300">Disponible 24h/24 - 7j/7</span></div></div>
        </div>
        <button id="closeSavModal" class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
      </div>
      <div id="savModalContent" class="overflow-y-auto" style="max-height:calc(95vh - 140px)">
        <!-- Contenu dynamique -->
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const contentDiv = document.getElementById('savModalContent');
  let currentMode = 'menu';

  function renderMenu() {
    contentDiv.innerHTML = `
      <div class="p-5">
        <p class="text-gray-600 text-sm mb-5">Comment souhaitez-vous être assisté ?</p>
        <div class="space-y-3">
          <button id="callBtn" class="w-full flex items-center gap-4 bg-red-600 hover:bg-black text-white px-5 py-4 rounded-2xl transition group">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.01 2.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg></div>
            <div class="text-left"><p class="font-semibold text-sm">Appel immédiat</p><p class="text-xs opacity-75">Un technicien vous rappelle sous 2 min</p></div>
          </button>
          <button id="chatBtn" class="w-full flex items-center gap-4 border-2 border-gray-200 hover:border-black bg-white px-5 py-4 rounded-2xl transition">
            <div class="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg></div>
            <div class="text-left"><p class="font-semibold text-sm">Assistant IA (chat automatique)</p><p class="text-xs text-gray-500">Réponse instantanée, disponible 24/7</p></div>
          </button>
        </div>
        <div class="mt-5 p-4 bg-gray-50 rounded-xl"><p class="text-xs text-gray-500 text-center">Toutes les demandes urgentes sont traitées en priorité. Satisfaction garantie.</p></div>
      </div>
    `;
    document.getElementById('callBtn')?.addEventListener('click', () => showCallForm());
    document.getElementById('chatBtn')?.addEventListener('click', () => showChat());
  }

  function showCallForm() {
    contentDiv.innerHTML = `
      <div class="p-5">
        <div class="flex items-center gap-3 mb-4"><button id="backMenuCall" class="text-gray-400 hover:text-black text-lg">←</button><h4 class="font-bold">Rappel immédiat</h4></div>
        <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-5"><p class="text-sm text-red-800 font-medium">Un technicien certifié vous rappelle sous 2 minutes</p><p class="text-xs text-red-600 mt-1">Service disponible 7j/7 incluant jours fériés</p></div>
        <div class="space-y-3">
          <div><label class="text-xs font-medium text-gray-700 mb-1 block">Votre numéro de téléphone *</label><input type="tel" id="callPhone" placeholder="06 12 34 56 78" class="w-full border-2 border-gray-200 focus:border-black rounded-xl px-4 py-3 outline-none text-sm"></div>
          <div><label class="text-xs font-medium text-gray-700 mb-1 block">Description rapide du problème (optionnel)</label><textarea id="callDesc" rows="2" placeholder="Ex: Mon alarme sonne en permanence..." class="w-full border-2 border-gray-200 focus:border-black rounded-xl px-4 py-3 outline-none text-sm resize-none"></textarea></div>
        </div>
        <div class="flex gap-3 mt-5"><button id="confirmCall" class="flex-1 bg-red-600 hover:bg-black text-white py-3 rounded-xl font-semibold text-sm transition">Confirmer le rappel</button><button id="backCallMenu" class="border-2 border-gray-200 px-4 py-3 rounded-xl text-sm">Retour</button></div>
      </div>
    `;
    document.getElementById('backMenuCall')?.addEventListener('click', renderMenu);
    document.getElementById('backCallMenu')?.addEventListener('click', renderMenu);
    document.getElementById('confirmCall')?.addEventListener('click', () => {
      const phone = document.getElementById('callPhone')?.value;
      if (phone && phone.trim()) {
        contentDiv.innerHTML = `
          <div class="p-5 text-center py-6">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div>
            <p class="text-green-700 font-bold text-lg">Demande enregistrée !</p><p class="text-gray-500 text-sm mt-2">Un technicien vous appelera au</p><p class="font-bold text-lg mt-1">${phone}</p><p class="text-gray-500 text-sm">dans moins de 2 minutes.</p>
            <div class="mt-4 p-3 bg-gray-50 rounded-xl"><p class="text-xs text-gray-500">Restez disponible sur ce numéro. Si vous ne décrochez pas, nous essaierons 3 fois.</p></div>
            <button id="closeCallConfirm" class="mt-5 bg-black text-white px-8 py-2.5 rounded-full text-sm">Fermer</button>
          </div>
        `;
        document.getElementById('closeCallConfirm')?.addEventListener('click', () => { modal.classList.add('hidden'); renderMenu(); });
      } else {
        alert('Veuillez entrer un numéro de téléphone.');
      }
    });
  }

  function showChat() {
    contentDiv.innerHTML = `
      <div class="flex flex-col h-[500px]">
        <div id="chatMessages" class="flex-1 overflow-y-auto px-4 pt-4 pb-2 space-y-3"></div>
        <div class="border-t px-4 py-3"><form id="chatForm" class="flex gap-2"><input type="text" id="chatInput" placeholder="Écrivez votre question..." class="flex-1 border-2 border-gray-200 focus:border-black rounded-full px-4 py-2 text-sm outline-none"><button type="submit" class="bg-black hover:bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></form><button id="backMenuChat" class="mt-2 text-xs text-gray-400 hover:text-gray-700 underline w-full text-center">← Retour au menu SAV</button></div>
      </div>
    `;
    const messagesDiv = document.getElementById('chatMessages');
    const addMessage = (sender, text) => {
      const div = document.createElement('div');
      div.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;
      div.innerHTML = `<div class="max-w-xs sm:max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${sender === 'user' ? 'bg-red-600 text-white rounded-br-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'}">${text}</div>`;
      messagesDiv.appendChild(div);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };
    addMessage('bot', "Bonjour ! Je suis l'assistant Alarm Vision. Comment puis-je vous aider aujourd'hui ?");

    const quickReplies = [
      { msg: 'Mon système de sécurité ne fonctionne plus.', reply: "Je comprends. Un dysfonctionnement système peut être lié à l'alimentation, aux piles des détecteurs ou à la centrale elle-même. Étape 1 : vérifiez que la centrale est sous tension (voyant vert). Étape 2 : testez le reset via l'application mobile. Si le problème persiste après redémarrage, je vous recommande un rappel technicien immédiat." },
      { msg: "Ma caméra ne s'affiche plus ou l'image est floue.", reply: "Problème caméra détecté. Causes fréquentes : cable HDMI/RJ45 débranché, mise à jour firmware en attente, ou objectif encrassé. Essayez : 1) Redémarrer la caméra depuis l'app 2) Nettoyer l'objectif 3) Vérifier la connexion réseau. Toujours bloqué ? Un technicien peut intervenir sous 48h." },
      { msg: 'Mon alarme a perdu la connexion réseau.', reply: "Perte de connexion identifiée. Vérifiez : 1) Que votre box internet fonctionne normalement 2) Que le module WiFi de la centrale est à portée 3) Qu'il n'y a pas de coupure opérateur dans votre zone. Si tout est OK, il peut s'agir d'un problème de firmware résolvable à distance par nos équipes." },
      { msg: "J'ai un autre problème technique à signaler.", reply: "Pas de souci, décrivez-moi votre problème en détail. Je vais analyser votre situation et orienter votre demande vers le technicien le plus qualifié. N'hésitez pas à mentionner la référence de votre équipement si vous l'avez sous la main." }
    ];

    const quickDiv = document.createElement('div');
    quickDiv.className = 'px-4 pb-3';
    quickDiv.innerHTML = `<p class="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Sujets fréquents :</p><div class="grid grid-cols-2 gap-2">${quickReplies.map((q, i) => `<button data-i="${i}" class="quick-reply flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 text-gray-700 text-xs font-medium px-3 py-2.5 rounded-xl text-left transition"><span>🔧📷📡🆘</span><span>${q.msg.substring(0, 30)}...</span></button>`).join('')}</div>`;
    messagesDiv.appendChild(quickDiv);

    document.querySelectorAll('.quick-reply').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = btn.getAttribute('data-i');
        const q = quickReplies[idx];
        addMessage('user', q.msg);
        setTimeout(() => addMessage('bot', q.reply), 800);
        btn.remove();
      });
    });

    document.getElementById('chatForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('chatInput');
      const msg = input.value.trim();
      if (!msg) return;
      addMessage('user', msg);
      input.value = '';
      setTimeout(() => {
        let reply = "Je transmets votre demande à notre équipe technique. Un conseiller peut vous rappeler sous 2 minutes si nécessaire.";
        const m = msg.toLowerCase();
        if (m.includes('systeme') || m.includes('centrale')) reply = quickReplies[0].reply;
        else if (m.includes('camera')) reply = quickReplies[1].reply;
        else if (m.includes('connexion') || m.includes('wifi')) reply = quickReplies[2].reply;
        else if (m.includes('autre')) reply = quickReplies[3].reply;
        else if (m.includes('prix') || m.includes('tarif')) reply = "Nos solutions démarrent à partir de 890 EUR pour une alarme intrusion, et 1 490 EUR pour la vidéo-surveillance IA. Un devis personnalisé est entièrement gratuit et sans engagement, disponible sous 24h.";
        else if (m.includes('garantie')) reply = "Tous nos systèmes bénéficient d'une garantie 3 ans pièces et main d'oeuvre, incluant les interventions sur site. La maintenance préventive à distance est incluse dans votre contrat.";
        else if (m.includes('installation') || m.includes('delai')) reply = "L'installation est réalisée par nos techniciens certifiés sous 5 à 10 jours ouvrés après validation de votre devis. Nous intervenons partout en France métropolitaine.";
        addMessage('bot', reply);
      }, 1000);
    });

    document.getElementById('backMenuChat')?.addEventListener('click', renderMenu);
  }

  badge.addEventListener('click', () => {
    modal.classList.remove('hidden');
    renderMenu();
  });
  document.getElementById('closeSavModal')?.addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
});

// Formulaire Contact (EmailJS)
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const params = {
        firstname: document.getElementById('firstname')?.value,
        name: document.getElementById('lastname')?.value,
        phone: document.getElementById('phone')?.value,
        email: document.getElementById('email')?.value,
        subject: document.getElementById('subject')?.value,
        message: document.getElementById('message')?.value,
      };
      emailjs.send('default_service', 'template_0xa5xf9', params)
        .then(() => {
          contactForm.classList.add('hidden');
          contactSuccess.classList.remove('hidden');
        })
        .catch(err => alert('Erreur lors de l\'envoi : ' + err.text));
    });
  }
});

// Formulaire Devis
document.addEventListener('DOMContentLoaded', function() {
  const devisForm = document.getElementById('devisForm');
  const devisSuccess = document.getElementById('devisSuccess');
  const typeParticulier = document.getElementById('typeParticulier');
  const typeEntreprise = document.getElementById('typeEntreprise');
  const companyFields = document.getElementById('companyFields');
  let selectedService = '';

  if (typeParticulier && typeEntreprise) {
    typeParticulier.addEventListener('click', () => {
      typeParticulier.classList.add('bg-white', 'shadow-sm', 'text-black');
      typeEntreprise.classList.remove('bg-white', 'shadow-sm', 'text-black');
      typeEntreprise.classList.add('text-gray-500');
      companyFields.classList.add('hidden');
    });
    typeEntreprise.addEventListener('click', () => {
      typeEntreprise.classList.add('bg-white', 'shadow-sm', 'text-black');
      typeParticulier.classList.remove('bg-white', 'shadow-sm', 'text-black');
      typeParticulier.classList.add('text-gray-500');
      companyFields.classList.remove('hidden');
    });
  }

  document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.service-btn').forEach(b => b.classList.remove('border-red-600', 'bg-red-50', 'text-red-700'));
      btn.classList.add('border-red-600', 'bg-red-50', 'text-red-700');
      selectedService = btn.getAttribute('data-service');
      document.getElementById('selectedService').value = selectedService;
    });
  });

  if (devisForm) {
    devisForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const clientType = typeParticulier.classList.contains('bg-white') ? 'Particulier' : 'Entreprise / Pro';
      const params = {
        firstname: document.getElementById('firstname')?.value,
        name: document.getElementById('name')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        client_type: clientType,
        company: document.getElementById('company')?.value || '',
        sector: document.getElementById('sector')?.value || '',
        service: selectedService,
        message: document.getElementById('message')?.value || '',
      };
      emailjs.send('default_service', 'template_0xa5xf9', params)
        .then(() => {
          devisForm.classList.add('hidden');
          devisSuccess.classList.remove('hidden');
        })
        .catch(err => alert('Erreur lors de l\'envoi : ' + err.text));
    });
  }
});