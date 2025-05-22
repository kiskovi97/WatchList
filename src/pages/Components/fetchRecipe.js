async function extractRecipe(url) {
    try {
        console.log(url);
        if (url.includes("streetkitchen"))
            return await extractRecipeStreetKitchen(url);
    } catch {

    }
}
async function extractRecipeStreetKitchen(url) {
    try {
        console.log(url);
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extracting recipe title, ingredients, and instructions using class names
        const title = doc.querySelector('.main .entry-title').textContent.trim();
        const details = doc.querySelector('.entry-content .entry-lead').textContent.trim();
        const ingredientSections = [];
        let currentSection = {
            title: "Ingredients",
            list: []
        };

        const ingredientContainers = doc.querySelectorAll('.ingredients-main .ingredient-group');
        for(let ingredientContainer of ingredientContainers)
        {
            for (const node of ingredientContainer.children) {
                var dd = node.querySelector("dd");
                if (node.tagName === "H3") {
                    if (currentSection.list.length > 0) {
                        ingredientSections.push(currentSection);
                    }
                    currentSection = {
                        title: node.textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(),
                        list: []
                    };
                } else if (dd) {
                    currentSection.list.push(
                        dd.textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
                    );
                }
            }
            // Push last section if it has ingredients
            if (currentSection.list.length > 0) {
                ingredientSections.push(currentSection);
            }
            
            currentSection = {
                title: "Ingredients",
                list: []
            };
        }
            // Push last section if it has ingredients
        if (currentSection.list.length > 0) {
            ingredientSections.push(currentSection);
        }
        

        const instructions = Array.from(doc.querySelectorAll('.the-content-div p'))
            .map(step => step.textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());

            //h3
        const tags = Array.from(doc.querySelectorAll('.tags-list a'))
                .map(step => step.textContent.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim());
        const imageMeta = doc.querySelector('meta[property="og:image"]');
        const image = imageMeta ? imageMeta.getAttribute('content') : null;

        // Creating JSON formatted recipe
        const data = {
            title,
            ingredients: ingredientSections,
            instructions,
            image,
            details,
            tags,
            sources: [
                {
                    name: "StreetKitchen",
                    link: url
                }
            ]
        };

        console.log(JSON.stringify(data, null, 2));
        return data;
    } catch {

    }
}
export default extractRecipe;