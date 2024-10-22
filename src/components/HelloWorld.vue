<template>
  <v-container class="text-black" style="min-height: 100vh">
    <v-row>
      <!-- Form Column -->
      <v-col cols="12" md="8">
        <v-card class="pa-6 floating-card" max-width="500" fluid>
          <v-card-title class="text-h4 mb-4 text-center">
            User Authentication
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                label="Email"
                outlined
                required
                prepend-inner-icon="mdi-email"
                class="mb-5"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                outlined
                required
                prepend-inner-icon="mdi-lock"
                class="mb-5"
              ></v-text-field>

              <div class="d-flex justify-space-between align-center mb-4">
                <v-btn color="primary" @click="handleSignUp" class="mr-2">
                  <v-icon left>mdi-account-plus</v-icon>
                  Sign Up
                </v-btn>

                <v-btn color="success" @click="handleLogin">
                  <v-icon left>mdi-login</v-icon>
                  Log In
                </v-btn>
              </div>

              <v-btn block outlined color="error" @click="handleLogout">
                <v-icon left>mdi-logout</v-icon>
                Log Out
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Logo Column (conditionally rendered only on md and above) -->
      <v-col
        v-if="showLogo"
        cols="12"
        md="4"
        class="d-flex justify-center align-center"
      >
        <v-img
          src="../assets/logo.png"
          alt="Logo"
          contain
          max-width="200"
          max-height="200"
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { signUp, login, logout } from "../supabase";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const showLogo = ref(false);

    const handleResize = () => {
      showLogo.value = window.innerWidth >= 960; // Show logo only on md (>= 960px)
    };

    onMounted(() => {
      // Initial check and window resize listener
      handleResize();
      window.addEventListener("resize", handleResize);
    });

    const handleSignUp = async () => {
      const { error } = await signUp(email.value, password.value);
      if (error) {
        alert(`Sign Up Error: ${error.message}`);
      } else {
        alert("Sign Up Successful");
      }
    };

    const handleLogin = async () => {
      const { error } = await login(email.value, password.value);
      if (error) {
        alert(`Login Error: ${error.message}`);
      } else {
        alert("Login Successful");
      }
    };

    const handleLogout = async () => {
      const { error } = await logout();
      if (error) {
        alert(`Logout Error: ${error.message}`);
      } else {
        alert("Logged Out Successfully");
      }
    };

    return {
      email,
      password,
      showLogo,
      handleSignUp,
      handleLogin,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.floating-card {
  border-radius: 20px;
  background-color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.v-text-field {
  border-radius: 10px;
}

.v-btn {
  border-radius: 8px;
  font-weight: bold;
}

.v-img {
  max-width: 200px;
  max-height: 200px;
}
</style>
