<script lang="ts">
    const { data } = $props()
    const { cats } = data
</script>

<main>
    <h1>Cat List</h1>
    {#if cats.length > 0}
        <div class="cat-header">
            <span>Name</span>
            <span>Color</span>
            <span>Age</span>
            <span class="spacer"></span>
        </div>
    {#each cats as cat }
        <form method="POST" action="?/deleteCat">
            <input name="catId" type="hidden" value={cat.catId} />
            <div class="cat-item">
                <span>{cat.name}</span>
                <span>{cat.color}</span>
                <span>{cat.age}</span>
                <button type="submit">✖</button>
            </div>
        </form>
    {/each}
    {:else}
        <div class="cat-item">
            <span>There are not cats, go <a href="/add-cat">add</a> some!</span>
        </div>
    {/if}
</main>

<style>
    .cat-header {
        display: flex;
        height: 40px;
        padding: 5px 0;
        line-height: 30px;
        color: white;
        background-color: var(--color-primary);
        border-bottom: 1px solid #f1f5f9;
        text-transform: uppercase;
        font-variant: small-caps;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
    }

    .cat-item {
        display: flex;
        height: 40px;
        padding: 5px 0;
        line-height: 30px;
        background-color: #e2e8f0;
        border-top: 1px solid #f1f5f9;
        border-bottom: 1px solid #f1f5f9;
        /* justify-content: space-between; */
    }

    .cat-header span,
    .cat-item span {
        flex: 1 1 0;
        padding-left: 20px;
    }

    .cat-header .spacer {
        flex: 0 0 auto;
        height: 28px;
        min-width: 28px;
        margin-right: 20px;
    }

    .cat-item button {
        flex: 0 0 auto;
        height: 28px;
        width: 28px;
        margin-right: 20px;
        text-transform: uppercase;
        font-variant: small-caps;
        background-color: var(--color-primary);
        border: none;
        /* border: 2px solid var(--color-primary-dark); */
        border-radius: 4px;
        color: white;
        cursor: pointer;
    }

    .cat-item button:hover {
        background-color: var(--color-primary-light);
    }

    .cat-item:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
</style>