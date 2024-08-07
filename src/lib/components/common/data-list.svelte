<script lang="ts">
    $props()
</script>

<div class="cat-header">
    <span>Name</span>
    <span>Color</span>
    <span>Age</span>
    <span class="spacer"></span>
</div>
{#each cats as cat }
    <form method="POST" action="?/deleteCat">
        <input name="catId" type="hidden" value={cat.catId}/>
        <div class="cat-item">
            <span>{cat.name}</span>
            <span>{cat.color}</span>
            <span>{cat.age}</span>
            <button type="submit">✖</button>
        </div>
    </form>
{/each}