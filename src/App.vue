<template>
  <div>
    <nav class="navbar">
      <div class="logo">Hot Rides Expo</div>
      <div class="nav-links">
        <RouterLink to="/" class="nav-link">Home</RouterLink>
        <RouterLink to="/about" class="nav-link">About</RouterLink>
      </div>
    </nav>

    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.navbar {
  background-color: #333; /* Change this to your desired background color */
  color: #fff; /* Change text color as needed */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  text-decoration: none;
  color: #fff;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #00bcd4; /* Change the hover color as desired */
}

.content {
  padding: 20px;
}
</style>
