<script lang="ts">
    const { form } = $props()
    const warning = form?.error

    const username = form?.user?.username || ''
    const password = form?.user?.password || ''

</script>

<main>
    <h1>{username}</h1>
    <form method="POST" action="?/logout" >
        <button>Logout</button>
    </form>
</main>

<style>
    button {
        margin-top: 8px;
        width: 300px;
        background-color: var(--color-primary);
        border: 2px solid var(--color-primary-dark);
        border-radius: 4px;
        color: white;
        height: 32px;
        cursor: pointer;
    }

    button:hover {
        background-color: var(--color-primary-light);
    }
</style>