const Intern = require('../lib/intern');

describe('Intern', () => {
  describe('Initialization', () => {
    // Positive test
    it("should create an object with given name, id and email properties when called with the 'new' keyword", () => {
      // Arrange
      const pname = 'John';
      const pid = 5;
      const pemail = 'john@yahoo.com';
      const pschool = 'U of T';

      // Act
      const obj = new Intern(pname,pid,pemail,pschool);

      // Assert
      expect(obj.getName()).toEqual(pname);
      expect(obj.getId()).toEqual(pid);
      expect(obj.getEmail()).toEqual(pemail);
      expect(obj.getSchool()).toEqual(pschool);
    });

    it("should return the value Intern when getRole function is called", () => {
  
        const obj = new Intern("A",1,"B","C");
  
        expect(obj.getRole()).toEqual("Intern");
      });

  });
});
