/**
 * 
 */
package structures;

import json.JSONException;
import json.JSONObject;

/**
 * @author hongning
 * @version 0.1
 * @category data structure
 * data structure for a forum discussion post 
 */
public class Post {
	//unique ID from the corresponding website
	String m_ID;
	
	public String getID() {
		return m_ID;
	}

	//author's displayed name
	String m_author;
	public String getAuthor() {
		return m_author;
	}

	public void setAuthor(String author) {
		this.m_author = author;
	}

	//unique author ID from the corresponding website
	String m_authorID;	
	public String getAuthorID() {
		return m_authorID;
	}

	public void setAuthorID(String authorID) {
		this.m_authorID = authorID;
	}

	//post title (might not be available in some medical forums)
	String m_title;//not available in WebMD
	public String getTitle() {
		return m_title;
	}

	public void setTitle(String title) {
		if (!title.isEmpty())
			this.m_title = title;
	}

	//post content
	String m_content;
	public String getContent() {
		return m_content;
	}

	public void setContent(String content) {
		if (!content.isEmpty())
			this.m_content = content;
	}

	//timestamp of the post
	String m_date;
	public String getDate() {
		return m_date;
	}

	public void setDate(String date) {
		this.m_date = date;
	}
	
	//post ID that this post is reply to
	String m_replyToID;
	public String getReplyToID() {
		return m_replyToID;
	}

	public void setReplyToID(String replyToID) {
		this.m_replyToID = replyToID;
	}
	
	int m_level; //only used in eHealth to keep track of reply-to relation
	public int getLevel() {
		return m_level;
	}

	public void setLevel(int level) {
		this.m_level = level;
	}

	public Post(String ID) {
		m_ID = ID;
	}
	
	public JSONObject getJSON() throws JSONException {
		JSONObject json = new JSONObject();
		json.put("postID", m_ID);
		json.put("author", m_author);
		json.put("authorID", m_authorID);
		json.put("replyTo", m_replyToID);
		json.put("date", m_date);
		json.put("title", m_title);
		json.put("content", m_content);
		
		return json;
	}
}
