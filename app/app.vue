<template>
  <div id="root_hope">
    <NuxtRouteAnnouncer />
    <div id="main">
      <Navbar />
      <NuxtPage />
    </div>
  </div>
</template>

<style>
html,
#root_hope {
  margin: 0;
  background-color: #ce98ff;
}
#main {
  width:95%;
  justify-self:center;
  background-color: #fff6f6;
  padding-bottom:1vw;
  margin-bottom:5vh;
  margin:0;
  display:grid;
}
</style>
