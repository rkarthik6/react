// require 'react' module
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery'); // load jquery
require('jquery-ui'); // load all jquery-ui modules

// Child Component
var Note = React.createClass({
	// Set Initial state, when page loads
	getInitialState: function(){
		return {editing: false};
	},
	//
	componentWillMount: function(){
		this.style = {
			right: this.randomBetween(0,window.innerWidth - 200) + 'px',
			top: this.randomBetween(0, window.innerHeight - 200) + 'px',
			transform: 'rotate(' + this.randomBetween(-15,15) + 'deg)'
		};
	},
	componentDidMount: function(){
		$(ReactDOM.findDOMNode(this)).draggable().addClass('animated');
	},
	// Generate random number for positioning
	randomBetween: function(min, max){
		return (min + Math.ceil(Math.random() * max));
	},
	// Edit Note
	edit: function(){
		this.setState({editing: true});
	},
	// Save Note
	save: function(){
		this.props.onChange(ReactDOM.findDOMNode(this.refs.newText).value, this.props.index);
		this.setState({editing: false});
	},
	// Remove/Delete Note 
	remove: function(){
		this.props.onRemove(this.props.index);
	},
	// Add content to the Note
	renderForm: function(){
		return(
			<div className="note" 
				style={this.style}>
				<textarea ref="newText" defaultValue={this.props.children}
							className="form-control"></textarea>
				<button onClick={this.save}
						className="btn btn-sm glyphicon glyphicon-floppy-disk" />
			</div>
			);
	},
	// Display edit/remove icon
	renderDisplay: function(){
		return (
			<div className="note"
				style={this.style}>
				<p>{this.props.children}</p>
				<span>
					<button onClick={this.edit}
							className="btn btn-primary btn-sm glyphicon glyphicon-pencil" />
					<button onClick={this.remove}
							className="btn btn-danger btn-sm glyphicon glyphicon-trash" />
				</span>
			</div>
			);
	},
	// Show the output
	render: function(){
		if(this.state.editing)
			return this.renderForm();
		else
			return this.renderDisplay();
	}
});

// Parent/Main component 
var Board = React.createClass({
	// To check validation
    propTypes: {
        count: function(props, propName) {
            if (typeof props[propName] !== "number"){
                return new Error('The count property must be a number');
            }
            if (props[propName] > 100) {
                return new Error("Creating " + props[propName] + " notes is ridiculous");
            }
        }
    },
    // Initial Function
    getInitialState: function() {
        return {
            todos: [],
            greeting: false
        };
    },
    nextId: function(){
    	this.uniqueId = this.uniqueId || 0;
    	return this.uniqueId++;
    },
    // Add new Todo
    add: function(text) {
        var arr = this.state.todos;
        arr.push({
        	id: this.nextId(),
        	todo: text 
        });
        this.setState({todos: arr});
    },
    // Update Todo
    update: function(newText, i) {
        var arr = this.state.todos;
        arr[i].todo = newText;
        this.setState({todos:arr});
    },
    // Delete/Remove Todo
    remove: function(i) {
        var arr = this.state.todos;
        arr.splice(i, 1);
        this.setState({todos: arr});
    },
    // List all the Todos
    eachNote: function(note, i) {
        return (
                <Note key={note.id}
                    index={i}
                    onChange={this.update}
                    onRemove={this.remove}
                >{note.todo}</Note>
            );
    },
    // Render the parent component
    render: function() {
        return (<div className="board">
                    {this.state.todos.map(this.eachNote)}
                    <button className="btn btn-success glyphicon glyphicon-plus"
                            onClick={this.add.bind(null, "New Note")}/>
            </div>

        );
    }
});

module.exports = Board;