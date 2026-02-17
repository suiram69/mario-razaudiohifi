let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarCarrito(id, nombre, precio) {
    const item = { id, nombre, precio, cantidad: 1 };
    const existe = carrito.find(p => p.id === id);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push(item);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function toggleCarrito() {
    document.getElementById('carrito').classList.toggle('visible');
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalEl = document.getElementById('total');
    const contador = document.getElementById('contador');
    lista.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
            <img src="https://via.placeholder.com/50?text=${item.nombre}" alt="${item.nombre}">
            <div>
                <p>${item.nombre} x${item.cantidad}</p>
                <p>${item.precio * item.cantidad}€</p>
                <button onclick="removerItem(${item.id})">Eliminar</button>
            </div>
        `;
        lista.appendChild(div);
        total += item.precio * item.cantidad;
    });
    totalEl.textContent = total + '€';
    contador.textContent = carrito.reduce((sum, item) => sum + item.cantidad, 0);
}

function removerItem(id) {
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

function contactar() {
    alert('¡Gracias! Contactaré contigo pronto por email o WhatsApp para finalizar la compra.');
}

actualizarCarrito();