window.onload = async function() {
    const productForm = document.getElementById('product-form');
    const saveBtn = document.getElementById('save-btn');
    const updateBtn = document.getElementById('update-btn');
    let currentPage = 1;

    try {
        await fetchProducts();
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        alert('Erro ao carregar produtos: ' + error);
    }

    document.getElementById('search').addEventListener('input', async function() {
        currentPage = 1;
        await fetchProducts();
    });

    productForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        const id = document.getElementById('product-id').value;
        const nome = event.target.nome.value.trim();
        const preco = parseFloat(event.target.preco.value.trim());

        if (!nome || isNaN(preco)) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        const product = { nome, preco };

        try {
            if (id) {
                await updateProduct(id, product);
                updateBtn.style.display = 'none';
                saveBtn.style.display = 'block';
            } else {
                await addProduct(product);
            }
            productForm.reset();
            await fetchProducts();
        } catch (error) {
            console.error('Erro ao adicionar/atualizar produto:', error);
            alert('Erro ao adicionar/atualizar produto.');
        }
    });
}

// Buscar produtos
async function fetchProducts(page = 1) {
    const productList = document.getElementById('product-list');
    const token = await getToken();
    const searchValue = document.getElementById('search').value.trim();
    const limit = 5;

    try {
        let url = `http://localhost:3000/produtos?page=${page}&limit=${limit}`;
        if (searchValue) {
            url += `&search=${encodeURIComponent(searchValue)}`;
        }

        const response = await fetch(url, {
            headers: {
                'authorization': token,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data.produtos)) {
            console.error('A resposta não é um array:', data);
            alert('Erro ao listar produtos: formato inesperado.');
            return;
        }

        productList.innerHTML = '';
        data.produtos.forEach(product => {
            const li = document.createElement('li');
            li.className = 'product-item';

            const productInfo = document.createElement('div');
            productInfo.className = 'product-info';
            productInfo.textContent = `${product.nome} - R$ ${product.preco}`;
            li.appendChild(productInfo);

            const buttons = document.createElement('div');
            buttons.className = 'product-buttons';

            const editButton = document.createElement('button');
            editButton.className = 'edit';
            editButton.textContent = 'Editar';
            editButton.onclick = () => editProduct(product);
            buttons.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete';
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => deleteProduct(product.id);
            buttons.appendChild(deleteButton);

            li.appendChild(buttons);
            productList.appendChild(li);
        });

        // Paginação
        renderPagination(data.page, data.totalPages);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        alert('Erro ao buscar produtos: ' + error.message);
    }
}

function renderPagination(currentPage, totalPages) {
    const paginationDiv = document.querySelector('.pagination');
    paginationDiv.innerHTML = '';

    for (let page = 1; page <= totalPages; page++) {
        const button = document.createElement('button');
        button.textContent = page;
        if (page === currentPage) {
            button.disabled = true;
        } else {
            button.onclick = async () => {
                await fetchProducts(page);
            };
        }
        paginationDiv.appendChild(button);
    }

    document.getElementById('list-btn').addEventListener('click', async function() {
        document.getElementById('search').value = ''; // Limpa o campo de busca
        currentPage = 1;
        await fetchProducts(); // Lista todos os produtos
    });

}

// Adicionar produto
async function addProduct(product) {
    const token = await getToken();

    try {
        const response = await fetch('http://localhost:3000/produtos', {
            method: 'POST',
            headers: {
                'authorization': token,
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar produto');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Atualizar produto
async function updateProduct(id, product) {
    const token = await getToken();

    try {
        const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'PUT',
            headers: {
                'authorization': token,
            },
            body: JSON.stringify(product),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar produto');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

// Editar produto
function editProduct(product) {
    document.getElementById('product-id').value = product.id;
    document.getElementById('nome').value = product.nome;
    document.getElementById('preco').value = product.preco;

    document.getElementById('save-btn').style.display = 'none';
    document.getElementById('update-btn').style.display = 'block';
}

document.getElementById('list-btn').addEventListener('click', async function() {
    document.getElementById('search').value = ''; // Limpa o campo de busca
    await fetchProducts(); // Lista todos os produtos
});

async function deleteProduct(id) {
    const token = await getToken();

    try {
        const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE',
            headers: {
                'authorization': token,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao excluir produto');
        }

        await fetchProducts(); // Atualiza a lista após exclusão
    } catch (error) {
        console.error(error);
        alert('Erro ao excluir produto.');
    }
}

// Obter o token de autenticação
async function getToken() {
    return localStorage.getItem('token');
}
