'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StageEvents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Event, Stage}) {
      StageEvents.belongsTo(Event, {
        foreignKey: "event_id",
        as:"events"
      })
      StageEvents.belongsTo(Stage, {
      foreignKey: "stage_id",
      as:"stages"
      })
    }
  }
  StageEvents.init({
      stage_events_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    event_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'StageEvents',
    tableName: 'stageevents',
    timestamps: false
  });
  return StageEvents;
};