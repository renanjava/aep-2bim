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
  const response = await fetch(`${apiUrl}/users`);
  const users = await response.json();
  const userList = document.querySelector('#userList');
  userList.innerHTML = users
    .map((user) => `
          <li>
            <div>
              <h2>${user.name}</h2>
              <p>${user.email}</p>
              <button onclick="editUser('${user.id}', '${user.name}', '${user.email}')">Editar</button>
              <button onclick="deleteUser('${user.id}')">Excluir</button>
            </div>
          </li>
        `)
    .join('');
}

// Função para editar um usuário
async function editUser(id, name, email) {
  const newName = prompt("Novo nome:", name);
  const newEmail = prompt("Novo email:", email);

  if (newName !== null && newEmail !== null) {
    try {
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao editar usuário');
      }

      loadUsers();
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}

// Função para excluir um usuário
async function deleteUser(id) {
  if (confirm('Tem certeza que deseja excluir este usuário?')) {
    try {
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
      }

      loadUsers();
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}

// Função para carregar os projetos
async function loadProjects() {
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
              <button onclick="editProject('${project.id}', '${project.title}', '${project.description}', '${project.userId}')">Editar</button>
              <button onclick="deleteProject('${project.id}')">Excluir</button>
            </div>
          </li>
        `)
    .join('');
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

// Função para editar um projeto
async function editProject(id, title, description, userId) {
  const newTitle = prompt("Novo título:", title);
  const newDescription = prompt("Nova descrição:", description);
  const newUserId = prompt("Novo ID do usuário:", userId);

  if (newTitle !== null && newDescription !== null && newUserId !== null) {
    try {
      const response = await fetch(`${apiUrl}/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          userId: newUserId,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao editar projeto');
      }

      loadProjects();
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}

// Função para excluir um projeto
async function deleteProject(id) {
  if (confirm('Tem certeza que deseja excluir este projeto?')) {
    try {
      const response = await fetch(`${apiUrl}/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir projeto');
      }

      loadProjects();
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}

// Função para carregar as parcerias
async function loadPartnerships() {
  const response = await fetch(`${apiUrl}/partnerships`);
  const partnerships = await response.json();
  const partnershipList = document.querySelector('#partnershipList');
  partnershipList.innerHTML = partnerships
    .map((partnership) => `
          <li>
            <div>
              <h2>Projeto ID: ${partnership.projectId}</h2>
              <p>Parceiro ID: ${partnership.partnerId}</p>
              <button onclick="editPartnership('${partnership.id}', '${partnership.projectId}', '${partnership.partnerId}')">Editar</button>
              <button onclick="deletePartnership('${partnership.id}')">Excluir</button>
            </div>
          </li>
        `)
    .join('');
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

// Função para editar uma parceria
async function editPartnership(id, projectId, partnerId) {
  const newProjectId = prompt("Novo ID do projeto:", projectId);
  const newPartnerId = prompt("Novo ID do parceiro:", partnerId);

  if (newProjectId !== null && newPartnerId !== null) {
    try {
      const response = await fetch(`${apiUrl}/partnerships/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: newProjectId,
          partnerId: newPartnerId,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao editar parceria');
      }

      loadPartnerships();
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}

// Função para excluir uma parceria
async function deletePartnership(id) {
  if (confirm('Tem certeza que deseja excluir esta parceria?')) {
    try {
      const response = await fetch(`${apiUrl}/partnerships/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir parceria');
      }

      loadPartnerships();
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}

// Função para carregar os financiamentos
async function loadFundings() {
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
              <button onclick="editFunding('${funding.id}', '${funding.title}', '${funding.description}', '${funding.amount}', '${funding.deadline}')">Editar</button>
              <button onclick="deleteFunding('${funding.id}')">Excluir</button>
            </div>
          </li>
        `)
    .join('');
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

// Função para editar um financiamento
async function editFunding(id, title, description, amount, deadline) {
  const newTitle = prompt("Novo título:", title);
  const newDescription = prompt("Nova descrição:", description);
  const newAmount = prompt("Novo valor:", amount);
  const newDeadline = prompt("Nova data limite:", deadline);

  if (newTitle !== null && newDescription !== null && newAmount !== null && newDeadline !== null) {
    try {
      const response = await fetch(`${apiUrl}/fundings/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          amount: newAmount,
          deadline: newDeadline,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao editar financiamento');
      }

      loadFundings();
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}

// Função para excluir um financiamento
async function deleteFunding(id) {
  if (confirm('Tem certeza que deseja excluir este financiamento?')) {
    try {
      const response = await fetch(`${apiUrl}/fundings/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir financiamento');
      }

      loadFundings();
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}

// Função para carregar os recursos educacionais
async function loadEducation() {
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
              <button onclick="editEducation('${resource.id}', '${resource.title}', '${resource.description}', '${resource.url}')">Editar</button>
              <button onclick="deleteEducation('${resource.id}')">Excluir</button>
            </div>
          </li>
        `)
    .join('');
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

// Função para editar um recurso educacional
async function editEducation(id, title, description, url) {
  const newTitle = prompt("Novo título:", title);
  const newDescription = prompt("Nova descrição:", description);
  const newUrl = prompt("Novo URL:", url);

  if (newTitle !== null && newDescription !== null && newUrl !== null) {
    try {
      const response = await fetch(`${apiUrl}/educations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
          description: newDescription,
          url: newUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao editar recurso educacional');
      }

      loadEducation();
    } catch (error) {
      console.error('Erro:', error);
    }
  }
}

// Função para excluir um recurso educacional
async function deleteEducation(id) {
  if (confirm('Tem certeza que deseja excluir este recurso educacional?')) {
    try {
      const response = await fetch(`${apiUrl}/educations/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir recurso educacional');
      }

      loadEducation();
    } catch (error) {
      console.error('Erro:', error);
    }
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