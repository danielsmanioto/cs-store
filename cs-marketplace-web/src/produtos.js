window.onload = async function() {
    const productList = document.getElementById('product-list');
    const productForm = document.getElementById('product-form');
    
    try {
        // Fetch all products from the backend and display them
        await fetchProducts();
        
        // Add event listener for form submission
        productForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = new FormData(productForm);
            const nome = formData.get('nome');
            const preco = formData.get('preco');
            
            // Create new product object
            const newProduct = { nome, preco };
            
            // Send new product data to the backend
            await addProduct(newProduct);
            
            // Clear form inputs
            productForm.reset();
            
            // Fetch and display updated product list
            await fetchProducts();
        });
    } catch (error) {
        console.error('Erro ao buscar ou adicionar produtos:', error);
    }
};

async function fetchProducts() {
    const productList = document.getElementById('product-list');
    
    // Fetch all products from the backend
    const token = getToken(); 
    const response = await fetch('http://localhost:3000/produtos', {
        headers: {
            'authorization': token, 
        },
    });
    const products = await response.json();
    
    // Clear previous product list
    productList.innerHTML = '';
    
    // Display products on the page
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.nome} - R$ ${product.preco}`;
        productList.appendChild(li);
    });
}

window.onload = async function() {
    const productList = document.getElementById('product-list');
    const productForm = document.getElementById('product-form');
    
    try {
        // Fetch all products from the backend and display them
        await fetchProducts();
        
        // Add event listener for form submission
        productForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission
            
            // Get form data
            const formData = new FormData(productForm);
            const nome = formData.get('nome');
            const preco = formData.get('preco');
            
            // Create new product object
            const newProduct = { nome, preco };
            
            // Send new product data to the backend
            await addProduct(newProduct);
            
            // Clear form inputs
            productForm.reset();
            
            // Fetch and display updated product list
            await fetchProducts();
        });
    } catch (error) {
        console.error('Erro ao buscar ou adicionar produtos:', error);
    }
};

async function fetchProducts() {
    const productList = document.getElementById('product-list');
    const token = await getToken(); // Certifique-se de usar await aqui

    const response = await fetch('http://localhost:3000/produtos', {
        headers: {
            'authorization': token
        },
    });

    if (!response.ok) {
        throw new Error(`Erro ao buscar produtos: ${response.statusText}`);
    }

    const products = await response.json();

    // Verifica se products é realmente um array
    if (!Array.isArray(products)) {
        console.error('A resposta não é um array:', products);
        return; // Sai da função se não for um array
    }

    productList.innerHTML = '';

    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.nome} - R$ ${product.preco}`;
        productList.appendChild(li);
    });
}

async function addProduct(product) {
    const token = await getToken(); // Get the token
    // Send new product data to the backend
    await fetch('http://localhost:3000/produtos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'authorization': token, 
        },
        body: JSON.stringify(product),
    });
}

async function getToken() {
    console.log('getToken')
    // Detalhes da requisição de login
    const loginDetails = {
        "email": "novousuario", // Substitua pelo email correto, se necessário
        "password": "senhasegura" // Substitua pela senha correta, se necessário
    };

    try {
        // Fazendo a requisição de login para obter o token
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginDetails)
        });

        // Verificando se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Falha ao realizar login');
        }

        // Extraindo o token da resposta
        const data = await response.json();
        const token = data.token; // Substitua 'token' pela chave correta, se necessário

        // Armazenando o token no localStorage para uso futuro
        localStorage.setItem('token', token);
        
        console.log('Token')
        console.log(token)   
        return token;
    } catch (error) {
        console.error('Erro ao obter token:', error);
        return null;
    }
}