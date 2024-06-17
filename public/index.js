const apiUrl = 'http://localhost:3000';

// Função para adicionar um novo usuário
async function addUser(event) {
  event.preventDefault();
  const form = document.querySelector('#userForm');
  const formData = new FormData(form);

  const userName = formData.get('name');
  const userEmail = formData.get('email');
  const userPassword = formData.get('password');

  try {
    const response = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userName,
        email: userEmail,
        password: userPassword,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar usuário');
    }

    form.reset();
    loadUsers();
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Função para carregar os usuários
async function loadUsers() {
  try {
    const response = await fetch(`${apiUrl}/users`);
    const users = await response.json();
    const userList = document.querySelector('#userList');
    userList.innerHTML = users
      .map((user) => `
        <li>
          <div>
            <h2>${user.name}</h2>
            <p>${user.email}</p>
          </div>
        </li>
      `)
      .join('');
  } catch (error) {
    console.error('Erro ao carregar usuários:', error);
  }
}

// Função para adicionar um novo projeto
async function addProject(event) {
  event.preventDefault();
  const form = document.querySelector('#projectForm');
  const formData = new FormData(form);

  const projectTitle = formData.get('title');
  const projectDescription = formData.get('description');
  const projectUserId = formData.get('userId');

  try {
    const response = await fetch(`${apiUrl}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: projectTitle,
        description: projectDescription,
        userId: projectUserId,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar projeto');
    }

    form.reset();
    loadProjects();
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Função para carregar os projetos
async function loadProjects() {
  try {
    const response = await fetch(`${apiUrl}/projects`);
    const projects = await response.json();
    const projectList = document.querySelector('#projectList');
    projectList.innerHTML = projects
      .map((project) => `
        <li>
          <div>
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <p>ID do Usuário: ${project.userId}</p>
          </div>
        </li>
      `)
      .join('');
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
  }
}

// Função para adicionar uma nova parceria
async function addPartnership(event) {
  event.preventDefault();
  const form = document.querySelector('#partnershipForm');
  const formData = new FormData(form);

  const projectId = formData.get('projectId');
  const partnerId = formData.get('partnerId');

  try {
    const response = await fetch(`${apiUrl}/partnerships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: projectId,
        partnerId: partnerId,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar parceria');
    }

    form.reset();
    loadPartnerships();
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Função para carregar as parcerias
async function loadPartnerships() {
  try {
    const response = await fetch(`${apiUrl}/partnerships`);
    const partnerships = await response.json();
    const partnershipList = document.querySelector('#partnershipList');
    partnershipList.innerHTML = partnerships
      .map((partnership) => `
        <li>
          <div>
            <h2>Projeto ID: ${partnership.projectId}</h2>
            <p>Parceiro ID: ${partnership.partnerId}</p>
          </div>
        </li>
      `)
      .join('');
  } catch (error) {
    console.error('Erro ao carregar parcerias:', error);
  }
}

// Função para adicionar um novo financiamento
async function addFunding(event) {
  event.preventDefault();
  const form = document.querySelector('#fundingForm');
  const formData = new FormData(form);

  const fundingTitle = formData.get('title');
  const fundingDescription = formData.get('description');
  const fundingAmount = formData.get('amount');
  const fundingDeadline = formData.get('deadline');

  try {
    const response = await fetch(`${apiUrl}/fundings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: fundingTitle,
        description: fundingDescription,
        amount: fundingAmount,
        deadline: fundingDeadline,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar financiamento');
    }

    form.reset();
    loadFundings();
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Função para carregar os financiamentos
async function loadFundings() {
  try {
    const response = await fetch(`${apiUrl}/fundings`);
    const fundings = await response.json();
    const fundingList = document.querySelector('#fundingList');
    fundingList.innerHTML = fundings
      .map((funding) => `
        <li>
          <div>
            <h2>${funding.title}</h2>
            <p>${funding.description}</p>
            <p>Valor: ${funding.amount}</p>
            <p>Data Limite: ${funding.deadline}</p>
          </div>
        </li>
      `)
      .join('');
  } catch (error) {
    console.error('Erro ao carregar financiamentos:', error);
  }
}

// Função para adicionar um novo recurso educacional
async function addEducation(event) {
  event.preventDefault();
  const form = document.querySelector('#educationForm');
  const formData = new FormData(form);

  const educationTitle = formData.get('title');
  const educationDescription = formData.get('description');
  const educationUrl = formData.get('url');

  try {
    const response = await fetch(`${apiUrl}/educations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: educationTitle,
        description: educationDescription,
        url: educationUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar recurso educacional');
    }

    form.reset();
    loadEducation();
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Função para carregar os recursos educacionais
async function loadEducation() {
  try {
    const response = await fetch(`${apiUrl}/educations`);
    const education = await response.json();
    const educationList = document.querySelector('#educationList');
    educationList.innerHTML = education
      .map((resource) => `
        <li>
          <div>
            <h2>${resource.title}</h2>
            <p>${resource.description}</p>
            <a href="${resource.url}" target="_blank">Acessar Recurso</a>
          </div>
        </li>
      `)
      .join('');
  } catch (error) {
    console.error('Erro ao carregar recursos educacionais:', error);
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
  loadProjects();
  loadPartnerships();
  loadFundings();
  loadEducation();
});
