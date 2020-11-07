<template>
    <div>
      <b-navbar toggleable="lg" variant="dark">
      <b-navbar-brand href="#"><img class="Image" src="../assets/logo.png" alt="Atlan"></b-navbar-brand>
      
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <router-link class="option" to="/home"> Home</router-link> -->
          <router-link class="option" to="/players"> Players</router-link>
          <router-link class="option" to="/teams"> Teams</router-link>
          <router-link class="option" to="/strikerate"> Average Strikerate</router-link>
          <!-- <router-link class="option" to="/matches"> Matches</router-link>
          <router-link class="option" to="/deliveries"> Deliveries</router-link> -->
          <router-link class="option" to="/teamwise"> Teamwise home and away</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <!-- <b-navbar-nav class="ml-auto">


          <b-nav-item-dropdown right> -->
            <!-- Using 'button-content' slot -->
            <!-- <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav> -->
      </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style>
.Image {
  height: 30px;
  width:  110px;
  border-radius: 10%;
} 

.option {
  color: white;
  margin: 0 15px;
}
</style>