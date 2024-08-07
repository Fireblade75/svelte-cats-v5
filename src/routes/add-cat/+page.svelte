<script lang="ts">
    const { form } = $props()
    const warning = form?.error

    const name = form?.cat?.name || ''
    const age = form?.cat?.age || 0
    const color = form?.cat?.color || null

    const baseColors = ['black', 'brown', 'gray', 'orange', 'white', 'yellow']
    const colorOptions = baseColors.map(value => {
        return {
            value,
            label: value.substring(0,1).toUpperCase() + value.substring(1),
            selected: color === value
        }
    })
</script>

<main>
    <h1>Add Cat</h1>
    {#if warning !== undefined}
    <div class="warning">
        <div class="warning-icon">
            <img src="/icons/warning.svg" alt="warning-icon" />
        </div>
        <div class="warning-text">{warning}</div>
    </div>
    {/if}
    <form method="POST" action="?/addCat" >
        <div class="form-line">
            <label for="name">Name: </label>
            <input type="text" name="name" id="name" required value={name} />
        </div>
        <div class="form-line">
            <label for="age">Age: </label>
            <input type="number" name="age" id="age" required value={age} />
        </div>
        <div class="form-line">
            <label for="color">Color: </label>
            <select name="color" id="color" required>
                <option disabled selected value>[select a color]</option>
                {#each colorOptions as option }
                    <option value={option.value} selected={option.selected}>{option.label}</option>
                {/each}
            </select>
        </div>
        <button>Add Cat</button>
    </form>
</main>

<style>
    label {
        flex: 0 0 auto;
        width: 80px;
        display: block;
        line-height: 27px;
    }

    select,
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