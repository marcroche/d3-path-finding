define(['src/model/MinPriorityQueue'], function(MinPriorityQueue) {
	describe("MinPriorityQueue", function() {
		var priorityQueue;

		beforeEach(function() {
			priorityQueue = new MinPriorityQueue('key', 'cost', []);
		});

		it("should be empty to start", function() {
			expect(priorityQueue.isEmpty()).toEqual(true);
		});

		it("should be able to push values", function() {
		});
	});
});
