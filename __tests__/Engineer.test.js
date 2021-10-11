const Engineer = require('../lib/engineer');

describe('Engineer', () => {
  describe('Initialization', () => {
    // Positive test
    it("should create an object with given name, id and email properties when called with the 'new' keyword", () => {
      // Arrange
      const pname = 'John';
      const pid = 5;
      const pemail = 'john@yahoo.com';
      const pgithub = 'johngit';

      // Act
      const obj = new Engineer(pname,pid,pemail,pgithub);

      // Assert
      expect(obj.getName()).toEqual(pname);
      expect(obj.getId()).toEqual(pid);
      expect(obj.getEmail()).toEqual(pemail);
      expect(obj.getGithub()).toEqual(pgithub);
    });

    it("should return the value Engineer when getRole function is called", () => {
  
        const obj = new Engineer("A",1,"B","C");
  
        expect(obj.getRole()).toEqual("Engineer");
      });

  });
});
