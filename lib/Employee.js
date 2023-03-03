// TODO: Write code to define and export the Employee class

const Employee = function (name, id, email) {
  this.name = name;
  this.id = id;
  this.email = email;

  this.getName = () => {
    return this.name;
  };

  this.getId = () => {
    return this.id;
  };

  this.getEmail = () => {
    return this.email;
  };

  
};
