
module.exports.parse = (data, field) => {

    let dataJson = JSON.parse(data[field]);


    console.log(dataJson);

    let members = [];

    dataJson.forEach(member => {
        members.push(member.value)
    });

    return members;
};