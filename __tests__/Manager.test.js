const Manager = require('../lib/manager');

describe('Manager', () => {
  describe('Initialization', () => {
    // Positive test
    it("should create an object with given name, id and email properties when called with the 'new' keyword", () => {
      // Arrange
      const pname = 'John';
      const pid = 5;
      const pemail = 'john@yahoo.com';
      const pofficeNumber = '555 666 7777';

      // Act
      const obj = new Manager(pname,pid,pemail,pofficeNumber);

      // Assert
      expect(obj.getName()).toEqual(pname);
      expect(obj.getId()).toEqual(pid);
      expect(obj.getEmail()).toEqual(pemail);
      expect(obj.getOfficeNumber()).toEqual(pofficeNumber);
    });

    it("should return the value Manager when getRole function is called", () => {
  
        const obj = new Manager("A",1,"B","C");
  
        expect(obj.getRole()).toEqual("Manager");
      });

  });
});
