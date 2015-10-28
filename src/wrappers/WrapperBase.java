package wrappers;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import json.JSONArray;
import json.JSONException;
import json.JSONObject;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import structures.Post;

/**
 * @author hongning
 * @version 0.1
 * @category Wrapper
 * code for base class of wrapper for parsing html files and extract threaded discussions to json format 
 */

public abstract class WrapperBase {
	
	public WrapperBase() {
		m_posts = new ArrayList<Post>();
		m_dateFormatter = new SimpleDateFormat("yyyyMMdd-HH:mm:ss Z");//standard date format for this project
	}
	
	String m_threadURL;
	String m_threadTitle;
	ArrayList<Post> m_posts;
	
	//date format helper to normalize different date format across websites
	SimpleDateFormat m_dateParser, m_dateFormatter;
	
	//parse the given HTML and extract the discussion posts 
	public boolean parseHTML(String filename) {
		try {
			return parseHTML(Jsoup.parse(new File(filename), "UTF-8"));
		} catch (IOException e) {
			System.err.format("[Error]Failed to parse %s!\n", filename);
			e.printStackTrace();
			return false;
		}
	}

	//extract the threaded discussion from the corresponding website
	abstract protected boolean parseHTML(Document doc); 
	
	abstract protected String extractReplyToID(String text);
	
	protected String parseDate(String date) throws ParseException {
		return m_dateFormatter.format(m_dateParser.parse(date));
	}
	
	public boolean save2Json(String filename) {
		JSONArray postlist = new JSONArray();
		for(Post p:m_posts){
			try {
				postlist.put(p.getJSON());
			} catch (JSONException e) {
				System.err.format("[Error]Failed to convert %s into json format!\n", p.getID());
				e.printStackTrace();
			}
		}		
		
		try {
			JSONObject thread = new JSONObject(); 
			
			thread.put("title", m_threadTitle);
			thread.put("URL", m_threadURL);
			thread.put("thread", postlist);
			
			BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(filename), "UTF-8"));
			writer.write(thread.toString());
			writer.close();
			
			return true;
		} catch (Exception e) {
			System.err.format("[Error]Failed to save to %s!\n", filename);
			e.printStackTrace();
			return false;
		}
	}
}
