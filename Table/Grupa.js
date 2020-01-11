const grupa = [
    {
        id_grupy: 1,
        nazwa: "grupa pierwsza"
    },
    {
        id_grupy: 2,
        nazwa: "grupa druga"
    }
];

function getGrupaById(id)
{
    grupa.forEach(grupa => {
        if(grupa.id_grupy === id){
            return grupa;
        }
    });
}

module.exports = grupa;