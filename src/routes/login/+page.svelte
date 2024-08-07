<script lang="ts">
    const { form } = $props()
    const warning = form?.error

    const username = form?.user?.username || ''
    const password = form?.user?.password || ''

</script>

<main>
    <h1>Login</h1>
    {#if warning !== undefined}
    <div class="warning">
        <div class="warning-icon">
            <img src="/icons/warning.svg" alt="warning-icon" />
        </div>
        <div class="warning-text">{warning}</div>
    </div>
    {/if}
    <form method="POST" action="?/login" >
        <div class="form-line">
            <label for="name">Username: </label>
            <input type="text" name="username" id="username" required value={username} />
        </div>
        <div class="form-line">
            <label for="password">Password: </label>
            <input type="password" name="password" id="password" required value={password} />
        </div>
        <button>Login</button>
    </form>
</main>

<style>
    label {
        flex: 0 0 auto;
        width: 80px;
        display: block;
        line-height: 27px;
    }

    input {
        flex: 1 1 0;
        height: 27px;
    }

    .form-line {
        display: flex;
        margin-bottom: 8px;
        max-width: 300px;
    }

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

    .warning {
        max-width: 600px;
        display: flex;
        margin-bottom: 16px;
    }

    .warning-icon {
        flex: 0 0 auto;
        background-color: var(--color-error);
        min-height: 32px;
        width: 32px;
        text-align: center;
        font-weight: bold;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }

    .warning-text {
        flex: 1 1 0;
        line-height: 32px;
        background-color: #e2e8f0;
        min-height: 32px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        padding: 0 10px;
    }

    .warning-icon img {
        height: 24px;
        width: 24px;
    }
</style>