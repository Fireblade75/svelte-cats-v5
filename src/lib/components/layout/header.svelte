<script lang="ts">
    import { page } from "$app/stores";    
    import { json } from "@sveltejs/kit";

    const { username } : { username: string | null } = $props()

    const path = $derived($page.url.pathname)
</script>

<header>
    <nav>
        <div class="logo">Svelte Cats v5</div>
        <a href="/" class:active={path === '/'}>Home</a>
        <a href="/cat-list" class:active={path === '/cat-list'}>Cat List</a>
        {#if username === null}
            <a href="/login" class:active={path === '/login'}>Login</a>
            <a href="/register" class:active={path === '/register'}>Register</a>
        {:else}
            <a href="/add-cat" class:active={path === '/add-cat'}>Add Cat</a>
            <a href="/logout" class:active={path === '/logout'}>{username}</a>
        {/if}
    </nav>
</header>

<style>
    header {
        height: 64px;
        background-color: var(--color-primary);
    }

    .logo {
        flex: 1 1 auto;
    }

    nav {
        display: flex;
        justify-content: right;
        gap: 16px;
        max-width: 1024px;
        margin-left: auto;
        margin-right: auto;
        padding: 0 16px;
    }

    .logo, a, a:visited, a:hover {
        color: white;
        line-height: 64px;
        text-decoration: none;
        text-transform: uppercase;
        font-variant: small-caps;
    }

    a.active {
        text-decoration: underline;
    }
</style>