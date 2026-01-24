// Page data
export async function getApi(param) {
    const response = await fetch(
        `https://cms.mehadih.info/api/get-req-data/sections?type=slug&value=${param}&get_section=yes&image=yes&post=yes&file=yes&gallery=yes`,
        {
            cache: "no-store"
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// Footer data
export async function getFooterApi() {
    const response = await fetch(
        `https://cms.mehadih.info/api/get-req-data/settings-data`,
        {
            cache: "no-store"
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const footer = await response.json();
    return footer;
}

// Project List
export async function getProjectApi() {
    const response = await fetch(
        `https://cms.mehadih.info/api/get-req-data/all-products?image=yes&post=yes&file=yes&specification=yes&gallery=yes&variation=yes&limit=`,
        {
            cache: "no-store"
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const project = await response.json();
    return project;
}


// Project Details
export async function getProjectDetailsApi(param) {
    const response = await fetch(
        `https://cms.mehadih.info/api/get-req-data/product-data?type=slug&value=${param}&image=yes&post=yes&file=yes&specification=yes&gallery=yes&variation=yes`,
        {
            cache: "no-store"
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projectdetails = await response.json();
    return projectdetails;
}

// Menu
export async function getMenuApi() {
    const response = await fetch(
        `https://cms.mehadih.info/api/get-req-data/menu-data?menu_id=1`,
        {
            cache: "no-store"
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const menu = await response.json();
    return menu;
}