const Employee = require('../lib/employee');

describe('Employee', () => {
  describe('Initialization', () => {
    // Positive test
    it("should create an object with given name, id and email properties when called with the 'new' keyword", () => {
      // Arrange
      const pname = 'John';
      const pid = 5;
      const pemail = 'john@yahoo.com'

      // Act
      const obj = new Employee(pname,pid,pemail);

      // Assert
      expect(obj.getName()).toEqual(pname);
      expect(obj.getId()).toEqual(pid);
      expect(obj.getEmail()).toEqual(pemail);
    });

    it("should return the value Employee when getRole function is called", () => {
  
        const obj = new Employee("A",1,"B");
  
        expect(obj.getRole()).toEqual("Employee");
      });

  });
});
