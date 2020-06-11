class Model {
  constructor(a) {
    if (a instanceof tf.Sequential){
      this.model = a;
    } else {
      this.model = tf.sequential();
      this.model.add(tf.layers.dense({inputShape: [4], units: 8, activation: 'relu'}));
      this.model.add(tf.layers.dense({units: 4, activation: 'relu'}));
      this.model.add(tf.layers.dense({units: 1, activation: 'sigmoid'}));
    }
  }

  evaluate(birdY, pipe1, pipe2, pipeD){
    let inputs = [];
    inputs[0] = birdY/800;
    inputs[1] = pipe1/800;
    inputs[2] = pipe2/800;
    inputs[3] = pipeD/900;

    const xs = tf.tensor2d([inputs]);

    var acc = this.model.predict(xs);

    const outputs = acc.dataSync()
    return outputs;
  }

  copy(){
    const modelCopy = new Model();
    const weights = this.model.getWeights();
    const weightCopies = [];

    for (var i = 0; i < weights.length; i++){
      weightCopies[i] = weights[i].clone();
    }
    modelCopy.model.setWeights(weights);
    return new Model(modelCopy);
  }

  mutate(rate){
    const weights = this.model.getWeights();
    const mutatedWeights = [];
    for (var i = 0; i < weights.length; i++){
      let tensor = weights[i];
      let shape = weights[i].shape;
      let values = tensor.dataSync();
      for (var j = 0; j < values.length; j++){
        if (random(1) < rate){
          let oneWeight = values[j];
          values[j] = oneWeight + randomGaussian();
        }
      }
      let revertTensor = tf.tensor(values, shape);
      mutatedWeights[i] = revertTensor;
    }
    this.model.setWeights(mutatedWeights);
  }

  crossover(weights2){
    var finalWeights = []
    const weights1 = this.model.getWeights();
    const half = weights1.length/2;
    for (var i = 0; i < 2; i++){
      for (var j = 0; j < half; j++){
        if (i == 0){
          finalWeights[j] = weights1[j];
        } else {
          finalWeights[j + half] = weights2[j + half];
        }
      }
    }
    this.model.setWeights(finalWeights);
  }

  genomeGive(){
    const weights = this.model.getWeights();
    return weights;
  }


}
