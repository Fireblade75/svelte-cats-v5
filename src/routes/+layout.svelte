<script lang="ts">
    import Header from "$lib/components/layout/header.svelte"
    import '../app.css'

    const { data } = $props()
</script>

<Header username={data.username} />

<slot />
