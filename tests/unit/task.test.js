const mongoose = require('mongoose');
const Task = require('../../src/models/task');

describe('Task Model - Validation', () => {
  it('crée une task valide avec title et description', () => {
    const task = new Task({
      title: 'Ma tâche',
      description: 'Une description',
    });

    const error = task.validateSync();
    expect(error).toBeUndefined();
  });

  it('échoue si title manquant', () => {
    const task = new Task({ description: 'Sans titre' });

    const error = task.validateSync();
    expect(error.errors.title).toBeDefined();
  });

  it('échoue si description manquante', () => {
    const task = new Task({ title: 'Sans description' });

    const error = task.validateSync();
    expect(error.errors.description).toBeDefined();
  });

  it('status est optionnel', () => {
    const task = new Task({ title: 'Titre', description: 'Desc' });

    const error = task.validateSync();
    expect(error).toBeUndefined();
    expect(task.status).toBeUndefined();
  });

  it('génère un _id automatiquement', () => {
    const task = new Task({ title: 'Titre', description: 'Desc' });
    expect(task._id).toBeInstanceOf(mongoose.Types.ObjectId);
  });

  it('génère les timestamps createdAt et updatedAt', () => {
    const task = new Task({ title: 'Titre', description: 'Desc' });
    // Les timestamps sont générés à la sauvegarde, le schema doit les avoir
    const schema = Task.schema;
    expect(schema.options.timestamps).toBe(true);
  });
});