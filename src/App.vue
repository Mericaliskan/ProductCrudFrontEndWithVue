<template>
  <div id="app">
    <header>
      <div class="header-buttons" v-if="!isLoggedIn">
        <button @click="toggleAuthMode" class="btn btn-primary">Giriş Yap</button>
        <button @click="toggleAuthMode" class="btn btn-secondary">Kayıt Ol</button>
      </div>
      <div v-if="isLoggedIn" class="header-buttons">
        <button @click="logout" class="btn btn-danger">Çıkış Yap</button>
      </div>
    </header>

   <!-- Giriş Formu -->
   <div class="split-screen">
    <div v-if="!isLoggedIn && loginMode" class="centered-form">
    <h2>Giriş Yap</h2>
    <form @submit.prevent="loginUser">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="loginForm.email" placeholder="Email">
        <span v-if="loginFormErrors.email" class="error-label">{{ loginFormErrors.email[0] }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="loginForm.password" placeholder="Password">
        <span v-if="loginFormErrors.password" class="error-label">{{ loginFormErrors.password[0] }}</span>
      </div>
      <!-- Eğer email veya password hatalı ise göster -->
      <span v-if="loginFormErrors.loginFailed" class="error-label">{{ loginFormErrors.loginFailed }}</span>
      <button type="submit" class="btn btn-primary">Giriş Yap</button>
    </form>
  </div>

  <!-- Kayıt Formu -->
  <div v-if="!isLoggedIn && !loginMode" class="centered-form">
    <h2>Kayıt Ol</h2>
    <form @submit.prevent="createUser">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" v-model="registerForm.name" placeholder="Name" >
        <span v-if="formErrors.name" class="error-label">{{ formErrors.name[0] }}</span>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="registerForm.email" placeholder="Email" >
        <span v-if="formErrors.email" class="error-label">{{ formErrors.email[0] }}</span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="registerForm.password" placeholder="Password" >
        <span v-if="formErrors.password" class="error-label">{{ formErrors.password[0] }}</span>
      </div>
      <div class="form-group">
        <label for="password_confirmation">Confirm Password</label>
        <input type="password" class="form-control" id="password_confirmation" v-model="registerForm.password_confirmation" placeholder="Confirm Password" >
        <span v-if="formErrors.password_confirmation" class="error-label">{{ formErrors.password_confirmation[0] }}</span>
        <span v-if="formErrors.password_match" class="error-label">{{ formErrors.password_match[0] }}</span>
      </div>
      <button type="submit" class="btn btn-secondary">Kayıt Ol</button>
    </form>
  </div>
   </div>


    <!-- Ürün Listesi -->
    <div v-if="isLoggedIn">
      <div class="table-product">
        <h1>Ürünler</h1>
        <table class="table">
        <thead>
          <tr>
            <th scope="col">Ürün Adı</th>
            <th scope="col">Fiyat</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>
              <button @click="openEditModal(product)" class="btn btn-primary">Düzenle</button>
              <button @click="deleteProduct(product.id)" class="btn btn-danger">Sil</button>    
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="openCreateModal" class="btn btn-success">Ürün Ekle</button>
      </div>
    </div>
    <!-- Oluşturma Modalı ve Düzenleme Modalı -->
<div v-if="createModalOpen" class="modal-overlay">
  <div class="modal-content">
    <h2>Ürün Oluştur</h2>
    <form @submit.prevent="createProduct" class="centered-form">
      <div class="form-group">
        <label for="productName">Ürün Adı</label>
        <input type="text" class="form-control" id="productName" v-model="newProduct.name" placeholder="Ürün Adı" required>
        <span v-if="formErrors.name" class="error-label">{{ formErrors.name[0] }}</span>
      </div>
      <div class="form-group">
        <label for="productPrice">Fiyat</label>
        <input type="number" class="form-control" id="productPrice" v-model="newProduct.price" placeholder="Fiyat" required>
        <span v-if="formErrors.price" class="error-label">{{ formErrors.price[0] }}</span>
      </div>
      <div style="margin-top: 10px;">
        <button type="submit" class="btn btn-primary">Ekle</button>
        <button @click="closeCreateModal" class="btn btn-secondary">İptal</button>
      </div>
    </form>
  </div>
</div>
<!-- Ürün Düzenleme Modalı -->
<div v-if="editModalOpen" class="modal-overlay">
  <div class="modal-content">
    <h2>Ürün Düzenle</h2>
    <form @submit.prevent="updateProduct">
      <div class="form-group">
        <label for="editProductName">Ürün Adı</label>
        <input type="text" class="form-control" id="editProductName" v-model="editedProduct.name" placeholder="Ürün Adı">
        <span v-if="formErrors.name" class="error-label">{{ formErrors.name[0] }}</span>
      </div>
      <div class="form-group">
        <label for="editProductPrice">Fiyat</label>
        <input type="number" class="form-control" id="editProductPrice" v-model="editedProduct.price" placeholder="Fiyat">
        <span v-if="formErrors.price" class="error-label">{{ formErrors.price[0] }}</span>
        <span v-if="formSubmitted && isProductUnchanged" class="error-label">No changes made to the product.</span>
      </div>
      <div style="margin-top: 10px;">
        <button type="submit" class="btn btn-primary">Güncelle</button>
        <button @click="closeEditModal" class="btn btn-secondary">İptal</button>
      </div>
    </form>
  </div>
</div>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      newProduct: {
        name: '',
        price: ''
      },
      createModalOpen: false,
      editModalOpen: false,
      editedProduct: {
        id: '',
        name: '',
        price: ''
      },
      loginMode: true,
      registerForm: {
        name: '',
        email: '',
        password: ''
      },
      loginForm: {
        email: '',
        password: ''
      },
      isLoggedIn: false,
      user: null,
      formErrors: {},
      loginFormErrors: {},
      formSubmitted:false,
    };
  },
  mounted() {
    this.checkAuth();
    this.fetchProducts();
  },
  computed: {
    isProductUnchanged() {
      const originalProduct = this.products.find(product => product.id === this.editedProduct.id);
      return originalProduct.name === this.editedProduct.name && originalProduct.price === this.editedProduct.price;
    }
  },
  methods: {
    fetchProducts() {
  const token = localStorage.getItem('token');

  if (token) {
    axios.get('http://127.0.0.1:8000/api/products', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        this.products = response.data.products;
      })
      .catch(error => {
        console.error(error);
      });
  }
},
    openCreateModal() {
      this.createModalOpen = true;
    },
    closeCreateModal() {
      this.createModalOpen = false;
      this.newProduct.name = '';
      this.newProduct.price = '';
    },
    createProduct() {
      this.formSubmitted = true;
      
      if (!this.newProduct.name || !this.newProduct.price) {
        return;
      }

      axios
        .post("http://127.0.0.1:8000/api/products", this.newProduct, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          console.log("Ürün eklendi:", response.data);
          this.fetchProducts();
          this.closeCreateModal();
        })
        .catch((error) => {
      if (error.response && error.response.data && error.response.data.errors) {
        
        const errors = error.response.data.errors;
        this.formErrors = errors;
      } else {
        console.error(error);
      }
    });
    },
    openEditModal(product) {
      this.editModalOpen = true;
      this.editedProduct = {
        id: product.id,
        name: product.name,
        price: product.price
      };
    },
    closeEditModal() {
      this.editModalOpen = false;
      this.editedProduct = {
        id: '',
        name: '',
        price: ''
      };
    },
    updateProduct() {
      this.formSubmitted = true;

      if (!this.editedProduct.name || !this.editedProduct.price) {
        this.formErrors.name = !this.editedProduct.name ? ['Ürün Adı alanı boş bırakılamaz.'] : null;
        this.formErrors.price = !this.editedProduct.price ? ['Fiyat alanı boş bırakılamaz.'] : null;
        return;
      }

      if (this.isProductUnchanged) {
        console.log("No changes made to the product.");
        return;
      }

      axios.put(`http://127.0.0.1:8000/api/products/${this.editedProduct.id}`, this.editedProduct, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => {
          console.log('Ürün güncellendi:', response.data);
          this.fetchProducts();
          this.closeEditModal();
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.errors) {
            const errors = error.response.data.errors;
            this.formErrors = errors;
          } else {
            console.error(error);
          }
        });
    },

    deleteProduct(productId) {
      const confirmed = confirm("Are you sure you want to delete this product?");

if (confirmed) {
  axios
    .delete(`http://127.0.0.1:8000/api/products/${productId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      console.log('Ürün silindi:', response.data);
      this.fetchProducts();
    })
    .catch(error => {
      console.error(error);
    });
}
},
    toggleAuthMode() {
      this.loginMode = !this.loginMode;
    },
    createUser() {
      axios.post('http://127.0.0.1:8000/api/auth/register', this.registerForm)
        .then(response => {
          console.log('Kayıt başarılı:', response.data);
          this.loginForm.email = this.registerForm.email;
          this.loginForm.password = this.registerForm.password;
          this.user = response.data.user;
          this.loginUser();
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.errors) {
            this.formErrors = error.response.data.errors;
          } else {
            console.error(error);
          }
        });
    },
    loginUser() {
      axios.post('http://127.0.0.1:8000/api/auth/login', this.loginForm)
        .then(response => {
          console.log('Giriş başarılı:', response.data);
          this.isLoggedIn = true;
          this.user = response.data.user;
          localStorage.setItem('token', response.data.token); 
          this.fetchProducts();
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            this.loginFormErrors = {
              loginFailed: 'Email & Password does not match with our record.',
              email: null,
              password: null,
            };
          } else if (error.response && error.response.data && error.response.data.errors) {
            const errors = error.response.data.errors;
            this.loginFormErrors.email = errors.email ? errors.email[0] : null;
            this.loginFormErrors.password = errors.password ? errors.password[0] : null;
            this.loginFormErrors.loginFailed = null;
          } else {
            console.error(error);
          }
        });
    },

    checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn = true;
        this.user = {
          token: token
        };
        this.fetchProducts();
      }
    },
    logout() {
  const token = localStorage.getItem('token');
  axios.post('http://127.0.0.1:8000/api/auth/logout', {}, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      console.log('Çıkış başarılı:', response.data);
      this.isLoggedIn = false;
      this.user = null;
      this.products = [];
      localStorage.removeItem('token');
    })
    .catch(error => {
      console.error('Çıkış hatası:', error);
      console.error('Hata yanıtı:', error.response.data);
    });
}


  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.table-product{
  margin-top: 5%;
}

.table {
  width: 100%;
  max-width: 1000px;
  border-collapse: collapse;
  margin: 0 auto;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

.btn {
  margin-right: 5px;
}

.modal-overlay {
  position: fixed;
  top: 50%; 
  left: 50%;
  transform: translate(-50%, -50%); /* Center the modal using transform */
  width: 100%; 
  height: 100%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  max-width: 50%;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.split-screen {
  width: 100%;
  position: fixed;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
}
form{
  width: 100%;
  max-width: 50%;
  margin:0 auto;
}
.form-group {
  width: 100%;
  margin-bottom: 20px;
}
.error-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  margin-top: 5px;
  color: crimson;
  transition: opacity 0.3s ease;
}
#app {
  position: relative;
}

header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-buttons {
  margin-right: 20px;
}

</style>
