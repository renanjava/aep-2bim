const apiUrl = 'http://localhost:3000';

async function loadUsers() {
  const response = await fetch(`${apiUrl}/users`);
  const users = await response.json();
  const userList = document.querySelector('#userList');
  userList.innerHTML = users.map(user => `
    <li>
      <div>
        <h2>${user.name}</h2>
        <p>${user.email}</p>
        <button title="Editar usuário" onclick="openEditUserDialog(${user.id}, '${user.name}', '${user.email}')" style="margin-right: 3px;">✏️</button>
        <button title="Excluir usuário" onclick="deleteUser(${user.id})" style="margin-left: 3px;">❌</button>
      </div>
    </li>`).join('');
}

async function loadProjects() {
  const response = await fetch(`${apiUrl}/projects`);
  const projects = await response.json();
  const projectList = document.querySelector('#projectList');
  projectList.innerHTML = projects.map(project => `
    <li>
      <div>
        <h2>${project.title}</h2>
        <p>${project.description}</p>
        <p>ID do Usuário: ${project.userId}</p>
        <button title="Editar projeto" onclick="openEditProjectDialog(${project.id}, '${project.title}', '${project.description}', '${project.userId}')" style="margin-right: 3px;">✏️</button>
        <button title="Excluir projeto" onclick="deleteProject(${project.id})" style="margin-left: 3px;">❌</button>
      </div>
    </li>`).join('');
}

async function loadPartnerships() {
  const response = await fetch(`${apiUrl}/partnerships`);
  const partnerships = await response.json();
  const partnershipList = document.querySelector('#partnershipList');
  partnershipList.innerHTML = partnerships.map(partnership => `
    <li>
      <div>
        <h2>Projeto ID: ${partnership.projectId}</h2>
        <p>Parceiro ID: ${partnership.partnerId}</p>
        <button title="Editar parceria" onclick="openEditPartnershipDialog(${partnership.id}, '${partnership.projectId}', '${partnership.partnerId}')" style="margin-right: 3px;">✏️</button>
        <button title="Excluir parceria" onclick="deletePartnership(${partnership.id})" style="margin-left: 3px;">❌</button>
      </div>
    </li>`).join('');
}

async function loadFundings() {
  const response = await fetch(`${apiUrl}/fundings`);
  const fundings = await response.json();
  const fundingList = document.querySelector('#fundingList');
  fundingList.innerHTML = fundings.map(funding => `
    <li>
      <div>
        <h2>${funding.title}</h2>
        <p>${funding.description}</p>
        <p>Valor: ${funding.amount}</p>
        <p>Data Limite: ${funding.deadline}</p>
        <button title="Editar financiamento" onclick="openEditFundingDialog(${funding.id}, '${funding.title}', '${funding.description}', '${funding.amount}', '${funding.deadline}')" style="margin-right: 3px;">✏️</button>
        <button title="Excluir financiamento" onclick="deleteFunding(${funding.id})" style="margin-left: 3px;">❌</button>
      </div>
    </li>`).join('');
}

async function loadEducation() {
  const response = await fetch(`${apiUrl}/educations`);
  const education = await response.json();
  const educationList = document.querySelector('#educationList');
  educationList.innerHTML = education.map(resource => `
    <li>
      <div>
        <h2>${resource.title}</h2>
        <p>${resource.description}</p>
        <a href="${resource.url}" target="_blank">Acessar Recurso</a>
        <button title="Editar recurso educacional" onclick="openEditEducationDialog(${resource.id}, '${resource.title}', '${resource.description}', '${resource.url}')" style="margin-right: 3px;">✏️</button>
        <button title="Excluir recurso educacional" onclick="deleteEducation(${resource.id})" style="margin-left: 3px;">❌</button>
      </div>
    </li>`).join('');
}

function openEditUserDialog(id, name, email) {
  document.querySelector('#editUserId').value = id;
  document.querySelector('#editUserName').value = name;
  document.querySelector('#editUserEmail').value = email;
  document.querySelector('#editUserDialog').showModal();
}

function openEditProjectDialog(id, title, description, userId) {
  document.querySelector('#editProjectId').value = id;
  document.querySelector('#editProjectTitle').value = title;
  document.querySelector('#editProjectDescription').value = description;
  document.querySelector('#editProjectUserId').value = userId;
  document.querySelector('#editProjectDialog').showModal();
}

function openEditPartnershipDialog(id, projectId, partnerId) {
  document.querySelector('#editPartnershipId').value = id;
  document.querySelector('#editPartnershipProjectId').value = projectId;
  document.querySelector('#editPartnershipPartnerId').value = partnerId;
  document.querySelector('#editPartnershipDialog').showModal();
}

function openEditFundingDialog(id, title, description, amount, deadline) {
  document.querySelector('#editFundingId').value = id;
  document.querySelector('#editFundingTitle').value = title;
  document.querySelector('#editFundingDescription').value = description;
  document.querySelector('#editFundingAmount').value = amount;
  document.querySelector('#editFundingDeadline').value = deadline;
  document.querySelector('#editFundingDialog').showModal();
}

function openEditEducationDialog(id, title, description, url) {
  document.querySelector('#editEducationId').value = id;
  document.querySelector('#editEducationTitle').value = title;
  document.querySelector('#editEducationDescription').value = description;
  document.querySelector('#editEducationUrl').value = url;
  document.querySelector('#editEducationDialog').showModal();
}

function closeEditUserDialog() {
  document.querySelector('#editUserDialog').close();
}

function closeEditProjectDialog() {
  document.querySelector('#editProjectDialog').close();
}

function closeEditPartnershipDialog() {
  document.querySelector('#editPartnershipDialog').close();
}

function closeEditFundingDialog() {
  document.querySelector('#editFundingDialog').close();
}

function closeEditEducationDialog() {
  document.querySelector('#editEducationDialog').close();
}

async function updateUser(event) {
  event.preventDefault();
  const id = document.querySelector('#editUserId').value;
  const name = document.querySelector('#editUserName').value;
  const email = document.querySelector('#editUserEmail').value;

  await fetch(`${apiUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  });

  closeEditUserDialog();
  loadUsers();
}

async function updateProject(event) {
  event.preventDefault();
  const id = document.querySelector('#editProjectId').value;
  const title = document.querySelector('#editProjectTitle').value;
  const description = document.querySelector('#editProjectDescription').value;
  const userId = document.querySelector('#editProjectUserId').value;

  await fetch(`${apiUrl}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, userId }),
  });

  closeEditProjectDialog();
  loadProjects();
}

async function updatePartnership(event) {
  event.preventDefault();
  const id = document.querySelector('#editPartnershipId').value;
  const projectId = document.querySelector('#editPartnershipProjectId').value;
  const partnerId = document.querySelector('#editPartnershipPartnerId').value;

  await fetch(`${apiUrl}/partnerships/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ projectId, partnerId }),
  });

  closeEditPartnershipDialog();
  loadPartnerships();
}

async function updateFunding(event) {
  event.preventDefault();
  const id = document.querySelector('#editFundingId').value;
  const title = document.querySelector('#editFundingTitle').value;
  const description = document.querySelector('#editFundingDescription').value;
  const amount = document.querySelector('#editFundingAmount').value;
  const deadline = document.querySelector('#editFundingDeadline').value;

  await fetch(`${apiUrl}/fundings/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, amount, deadline }),
  });

  closeEditFundingDialog();
  loadFundings();
}

async function updateEducation(event) {
  event.preventDefault();
  const id = document.querySelector('#editEducationId').value;
  const title = document.querySelector('#editEducationTitle').value;
  const description = document.querySelector('#editEducationDescription').value;
  const url = document.querySelector('#editEducationUrl').value;

  await fetch(`${apiUrl}/educations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description, url }),
  });

  closeEditEducationDialog();
  loadEducation();
}

async function deleteUser(id) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    await fetch(`${apiUrl}/users/${id}`, {
      method: 'DELETE',
    });
    loadUsers();
  }
}

async function deleteProject(id) {
  if (confirm('Tem certeza que deseja excluir este projeto?')) {
    await fetch(`${apiUrl}/projects/${id}`, {
      method: 'DELETE',
    });
    loadProjects();
  }
}

async function deletePartnership(id) {
  if (confirm('Tem certeza que deseja excluir esta parceria?')) {
    await fetch(`${apiUrl}/partnerships/${id}`, {
      method: 'DELETE',
    });
    loadPartnerships();
  }
}

async function deleteFunding(id) {
  if (confirm('Tem certeza que deseja excluir este financiamento?')) {
    await fetch(`${apiUrl}/fundings/${id}`, {
      method: 'DELETE',
    });
    loadFundings();
  }
}

async function deleteEducation(id) {
  if (confirm('Tem certeza que deseja excluir este recurso educacional?')) {
    await fetch(`${apiUrl}/educations/${id}`, {
      method: 'DELETE',
    });
    loadEducation();
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
