const mapNeo4JDateToVanillaDate = (neo4jDate) => {
    return new Date(`${neo4jDate.year}-${neo4jDate.month}-${neo4jDate.day}`);
};

const mapVanillaDateToNeo4jDate = (vanillaDate) => {
    return {
        year: vanillaDate.getFullYear(),
        month: vanillaDate.getMonth() + 1,
        day: vanillaDate.getDate()
    };
};

const mapVanillaDateToIsoDate = (vanillaDate) => {
    return vanillaDate.toISOString().substr(0,10);
}

export { mapNeo4JDateToVanillaDate, mapVanillaDateToNeo4jDate, mapVanillaDateToIsoDate };