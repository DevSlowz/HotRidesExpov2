<template>
    <nav class="bg-gray-800">
        <div class="nav-container flex justify-between items-center px-4 py-3">
            <div class="nav-brand">
                <h1 class="text-white text-2xl font-bold">HotRidesExpo</h1>
            </div>
            <div class="nav-links">
                <ul class="flex flex-1 space-x-4 text-white">
                    <RouterLink class="cursor-pointer" :to="{name: ''}">Home</RouterLink>
                    <RouterLink class="cursor-pointer" :to="{name: 'Login'}">Login</RouterLink>
                    <li class="cursor-pointer">Logout</li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    setup() {}
}
</script>
