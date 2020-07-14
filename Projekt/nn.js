
//Tensorflow

class NeuralNetwork {
  constructor(a, b, c, d, e) {
    if (a instanceof tf.Sequential) {
      this.model = a;
      this.input_nodes = b;
      this.hidden_nodes1 = c;
      this.hidden_nodes2 = d;
      this.output_nodes = e;
    } else {
      this.input_nodes = a;
      this.hidden_nodes1 = b;
      this.hidden_nodes2= c;
       this.output_nodes = d;
      this.model = this.createModel();
    }
  }

  copy() {
    return tf.tidy(() => {
      const modelCopy = this.createModel();
      const weights = this.model.getWeights();
      const weightCopies = [];
      for (let i = 0; i < weights.length; i++) {
        weightCopies[i] = weights[i].clone();
      }
      modelCopy.setWeights(weightCopies);
      return new NeuralNetwork(
        modelCopy,
        this.input_nodes,
        this.hidden_nodes1,
        this.hidden_nodes2,
        this.output_nodes
      );
    });
  }


// COuld be improved alot..
crossOver(a, b) {
   tf.tidy(() => {
  let cutPoint = Math.round(random(0, 1));
  //console.log(cutPoint);
  for (let i = cutPoint; i < cutPoint+1; i++) {
    let aWeights = a.model.layers[i].getWeights()[0];
    let aBias = a.model.layers[i].getWeights()[1];
    let bWeights = b.model.layers[i].getWeights()[0];
    let bBias = b.model.layers[i].getWeights()[1];
    b.model.layers[i].setWeights([aWeights,aBias]);
    a.model.layers[i].setWeights([bWeights,bBias]);
}
if (random(0,1) > 0.5){
	return a
}
else {
	return b
}
 });
}

  mutate(rate) {
    tf.tidy(() => {
      const weights = this.model.getWeights();
      const mutatedWeights = [];
      for (let i = 0; i < weights.length; i++) {
        let tensor = weights[i];
        let shape = weights[i].shape;
        let values = tensor.dataSync().slice();
        for (let j = 0; j < values.length; j++) {
          if (random(1) < rate) {
            let w = values[j];
            values[j] = w + randomGaussian();
          }
        }
        let newTensor = tf.tensor(values, shape);
        mutatedWeights[i] = newTensor;
      }
      this.model.setWeights(mutatedWeights);

    });
  }

  dispose() {
    this.model.dispose();
  }

  predict(inputs) {
    return tf.tidy(() => {
      const xs = tf.tensor2d([inputs]);
      const ys = this.model.predict(xs);
      const outputs = ys.dataSync();
     // console.log(outputs);
      return outputs;
    });
  }

  createModel() {
    const model = tf.sequential();
    const hidden1 = tf.layers.dense({
      units: this.hidden_nodes1,
      inputShape: [this.input_nodes],
      activation: 'sigmoid',
      useBias: true,
      biasInitializer: tf.initializers.constant({
      value: Math.random(0, 1) })
    });
    model.add(hidden1);
    
        const hidden2 = tf.layers.dense({
      units: this.hidden_nodes2,
      inputShape: [this.hidden_nodes1],
      activation: 'sigmoid',
      useBias: true,
      biasInitializer: tf.initializers.constant({
      value: Math.random(0, 1) })
    });
    model.add(hidden2);
    
    const output = tf.layers.dense({
      units: this.output_nodes,
      activation: 'softmax',
      useBias: true,
      biasInitializer: tf.initializers.constant({
      value: Math.random(0, 1) })
    });
    model.add(output);
    return model;
  }
}